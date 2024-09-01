System.register("math-questions", ["axios"], function (exports_1, context_1) {
    "use strict";
    var axios_1;
    var __moduleName = context_1 && context_1.id;
    async function handler(req, res) {
        try {
            const response = await axios_1.default.get('http://localhost:1337/api/questions');
            const questions = response.data.data;
            res.status(200).json(questions);
        }
        catch (error) {
            res.status(500).json({ error: 'Failed to fetch questions from Strapi' });
        }
    }
    exports_1("default", handler);
    return {
        setters: [
            function (axios_1_1) {
                axios_1 = axios_1_1;
            }
        ],
        execute: function () {
        }
    };
});
