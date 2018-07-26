const noflo = require('noflo');
var r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost', port: 28015}
    ],
	db: "Octa"
});

exports.getComponent = () => {
  const c = new noflo.Component();
  c.description = 'rethinkDB';
  c.icon = 'database';
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
    // Read packets we need to process
    const data = input.getData('in');
    // Process data and send output
    console.log("--> " + data.AutoNum);
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};


