var noflo = require('noflo');
var r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost', port: 28015}
    ],
	db: "Octa"
});

exports.getComponent = function() {
  var c = new noflo.Component();
  c.description = 'dos';
  c.icon = 'address-book';
  c.inPorts.add('in', {
    datatype: 'all',
    description: 'Packet to forward'
  });
  c.outPorts.add('out', {
    datatype: 'all'
  });
  c.process(function (input, output) {
    // Check preconditions on input data
    if (!input.hasData('in')) {
      return;
    }
    // Read packets we need to process
    var data = input.getData('in');
    if(data != null) {
    	console.log(">> : " + data.AutoNum);
        var autoNum = data.AutoNum;
        var axtraxEmpID = data.iUserNum;
        r.
    	// Process data and send output
    }
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};



/*
Sample Axtrax Event Record:

{ AutoNum: '78267',
  iEventNum: 817,
  bDoorNumber: 1,
  dtSave: 2018-07-20T08:23:04.000Z,
  dEvent_Date: 2018-07-20T07:54:08.000Z,
  tByte6: '11',
  tByte7: '01',
  tByte8: '21',
  iUserNum: 56,
  iSlotNum: 35,
  tCardCode: '',
  iReader: 1,
  iDoor: 0,
  bCamera: false,
  iUserSlot: 60,
  bAlarmHandl: 0,
  iInput: 0,
  iOutput: 0,
  iCamera: 0,
  tCameraIdent: '',
  iServerVitrax: 0,
  Event_Desc: null 
}
*/