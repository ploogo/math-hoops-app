System.register("layout", ["react", "next/font/google", "./globals.css"], function (exports_1, context_1) {
    "use strict";
    var react_1, google_1, inter, metadata;
    var __moduleName = context_1 && context_1.id;
    function RootLayout({ children, }) {
        return (react_1.default.createElement("html", { lang: "en" },
            react_1.default.createElement("body", { className: inter.className }, children)));
    }
    exports_1("default", RootLayout);
    return {
        setters: [
            function (react_1_1) {
                react_1 = react_1_1;
            },
            function (google_1_1) {
                google_1 = google_1_1;
            },
            function (_1) {
            }
        ],
        execute: function () {
            inter = google_1.Inter({ subsets: ["latin"] });
            exports_1("metadata", metadata = {
                title: "Math Hoops",
                description: "Generated by create next app",
            });
        }
    };
});