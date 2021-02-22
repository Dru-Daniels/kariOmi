const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/kariomi",
      test: "postgres://postgres:postgres@localhost:5432/kariomi_test",
      e2e: "postgres://postgres:postgres@localhost:5432/kariomi_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
