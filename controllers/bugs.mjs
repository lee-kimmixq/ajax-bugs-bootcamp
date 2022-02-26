export default function initBugsController(db) {
  const createBug = async (req, res) => {
    try {
      const {
        problem, error, commit, feature,
      } = req.body;

      // why cannot do featureObj.createBug -- error that feature_id cannot be null
      const featureObj = await db.Feature.findOne({ where: { name: feature } });
      const bug = await db.Bug.create({
        problem, error_text: error, commit, feature_id: featureObj.id,
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
