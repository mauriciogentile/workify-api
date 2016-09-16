
describe('FlowRepository Tests', function() {

  var flowRepository;

  beforeEach(function() {
    flowRepository = require('../../../../app/repositories/mongo/flow-repository');
  });

  describe('getFlowData()', function() {

    it('should be a function', function(done) {
      expect(flowRepository.getFlowData).to.be.a('function');
      done();
    });

  });
});
