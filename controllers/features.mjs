export default function initFeaturesController(db) {
  const getFeatures = async (req, res) => {
    const features = await db.Feature.findAll();
    res.send(features);
  };

  const createFeature = async (req, res) => {
    const { name } = req.body;
    const feature = await db.Feature.create({ name });
    res.send(feature);
  };

  return { getFeatures, createFeature };
}
