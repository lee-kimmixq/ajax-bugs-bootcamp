export default function initBugsController(db) {
  const createBug = async (req, res) => {
    try {
      const {
        problem, error, commit, feature,
      } = req.body;
      const featureObj = await db.Feature.findOne({ where: { name: feature } });
      const bug = await featureObj.createBug({
        problem, errorText: error, commit,
      });
      res.send(bug);
    } catch (err) {
      console.log(err);
    }
  };

  const getBugs = async (req, res) => {
    const bugs = await db.Bug.findAll({ include: db.Feature });
    res.send(bugs);
  };

  return { createBug, getBugs };
}
