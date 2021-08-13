describe("Upload a File SUITE", () => {
    it("XHR Way", () => {
        function form_request(method, url, formData, done) {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url)
            xhr.onload = function () {
                done(xhr);
            };
            xhr.onerror = function () {
                done(xhr);
            };
            xhr.send(formData);
        }

        const fileName1 = "yey.jpg";
        const fileName2 = "logo.jpg";
        const method = "POST";
        const url = "http://localhost:4000/graphql";

        const assertionValue = [
            {
                "url": `http://localhost:4000/FileUpload/${fileName1}`
            },
            {
                "url": `http://localhost:4000/FileUpload/${fileName2}`
            }
        ]

        cy.fixture(fileName1, "binary")
            .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
            .then((blob1) => {
                cy.fixture(fileName2, "binary")
                    .then((txtBin) => Cypress.Blob.binaryStringToBlob(txtBin))
                    .then((blob2) => {
                        const formData = new FormData();
                        formData.append("operations", "{\"query\":\"mutation($files:[Upload!]!) {multipleUploadFile(files: $files){url}}\", \"variables\": { \"files\": [null, null] }}");
                        formData.append("map", "{\"0\": [\"variables.files.0\"], \"1\": [\"variables.files.1\"]}");
                        formData.append("0", blob1, fileName1);
                        formData.append("1", blob2, fileName2);
                        form_request(method, url, formData, function (response) {
                            console.log(response.response)
                            expect(response.status).to.eq(200);
                            expect(JSON.parse(response.response).data.multipleUploadFile).to.eql(assertionValue);
                        });
                    })
            });
    });
});