describe('Group TCS Suite 1', () => {

    it('Smoke Test', () => {
        expect(true).to.be.true
    });

    it('Regression Test', () => {
        expect(2).to.eql(2)
    });

    it('Sprint Test', () => {
        expect("QA Box Let's Test").to.contains("Test")
    });

});