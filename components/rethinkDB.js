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
    
    var userNum = data.iUserNum; 
    r.table('Axtrax_Employee').filter({axtraxID: userNum}).run().then(function(result){
      console.log("--> " + data.iUserNum);	
      console.log(result); 
      var employeeID = data.employeeID;
      if(result.length > 0 ){
        r.table('AxtraxEvents').filter(
          r.row('date').default('?').eq('2018-07-27').and(r.row(employeeID).eq(employeeID))
        ).then(function(result){console.log(result)})
      }
      
    })
    output.send({
      out: data
    });
    // Deactivate
    output.done();
  });
  return c;
};

/*
{
  "AutoNum": "78224",
  "Event_Desc": null,
  "bAlarmHandl": 0,
  "bCamera": false,
  "bDoorNumber": 1,
  "dEvent_Date": "2018-07-19T07:52:05.000Z",
  "dtSave": "2018-07-19T09:29:36.000Z",
  "iCamera": 0,
  "iDoor": 0,
  "iEventNum": 774,
  "iInput": 0,
  "iOutput": 0,
  "iReader": 1,
  "iServerVitrax": 0,
  "iSlotNum": 4,
  "iUserNum": 8,
  "iUserSlot": 8,
  "id": "1a867f81-f167-4678-a364-11bda82dceb6",
  "tByte6": "11",
  "tByte7": "01",
  "tByte8": "21",
  "tCameraIdent": "",
  "tCardCode": ""
}
*/

