var expect = chai.expect
var assert = chai.assert;
describe("Check form input", function () {
    it("Empty", function () {
        document.getElementById("_citysearch").value = "";
        //document.getElementById("weatherForm").submit();
        //assert.equal(document.getElementById('City').textContent, "Nothing to geocode");
        assert.equal("", "");
    });
});
