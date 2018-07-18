const noflo = require('noflo');

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'uno';
  c.icon = '500px';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  c.process((input, output) => {
    // Check preconditions on input data
    if (!input.hasData('in')) {
      return;
    }
    console.log("-->");
    // Read packets we need to process
    const data = input.getData('in');
    // Process data and send output
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};
