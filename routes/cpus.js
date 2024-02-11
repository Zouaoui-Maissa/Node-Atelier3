const os = require('os');

module.exports = (req, res) => {
  const cpuId = req.params.id;
  const cpus = os.cpus();

  if (cpuId >= 0 && cpuId < cpus.length) {
    const cpu = cpus[cpuId];
    res.json(cpu);
  } else {
    res.status(404).json({ error: 'Processor not found' });
  }
};