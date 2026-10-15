BEGIN;

-- 1. Add the career reference if it does not already exist.
ALTER TABLE user_skills
ADD COLUMN IF NOT EXISTS career_id INTEGER;

-- 2. Associate existing ratings with each user's current target career.
-- Existing ratings are not copied into every career.
UPDATE user_skills AS us
SET career_id = c.id
FROM users AS u
JOIN careers AS c
    ON LOWER(TRIM(c.title)) = LOWER(TRIM(u.target_career))
WHERE us.user_id = u.id
  AND us.career_id IS NULL;

-- 3. Stop safely if an existing rating cannot be assigned
-- to the user's current target career.
DO $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM user_skills
        WHERE career_id IS NULL
    ) THEN
        RAISE EXCEPTION
            'Migration stopped: some existing skill ratings could not be mapped to a career. No migration changes were committed.';
    END IF;
END $$;

-- 4. Remove duplicate records for the same user, career, and skill,
-- retaining the record with the highest ID.
-- This prevents the unique constraint below from failing.
WITH ranked_skills AS (
    SELECT
        id,
        ROW_NUMBER() OVER (
            PARTITION BY user_id, career_id, skill_id
            ORDER BY id DESC
        ) AS row_number
    FROM user_skills
)
DELETE FROM user_skills
WHERE id IN (
    SELECT id
    FROM ranked_skills
    WHERE row_number > 1
);

-- 5. Require every rating to belong to a career.
ALTER TABLE user_skills
ALTER COLUMN career_id SET NOT NULL;

-- 6. Add the career foreign key if it does not already exist.
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM pg_constraint
        WHERE conname = 'fk_user_skills_career_id'
          AND conrelid = 'user_skills'::regclass
    ) THEN
        ALTER TABLE user_skills
        ADD CONSTRAINT fk_user_skills_career_id
        FOREIGN KEY (career_id)
        REFERENCES careers(id);
    END IF;
END $$;

-- 7. Prevent duplicate ratings for the same user, career, and skill.
CREATE UNIQUE INDEX IF NOT EXISTS
    uq_user_skills_user_career_skill
ON user_skills (user_id, career_id, skill_id);

COMMIT;