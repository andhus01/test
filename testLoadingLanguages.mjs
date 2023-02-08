import Dictionary from "../Dictionary.mjs"

await (async function  runTests() {
    testCreatingLanguageInterface();
    testSuportingLanguageFiles();
    await testTranslating();
})();


function testCreatingLanguageInterface() {
    const dictionary = new Dictionary();
    test(dictionary != undefined, "Creating instance of Language suport module");
}

function testSuportingLanguageFiles() {
    const languages = ["./lan/no.json", "./lan/en.json"];
    const dictionary = new Dictionary(...languages);
    test(JSON.stringify(dictionary.languagefiles) === JSON.stringify(languages), "Testing setting of languages");
}

function testLoadingLangaugeResources() {
    const languages = ["./lan/no.json", "./lan/en.json"];
    const dictionary = new Dictionary(...languages);
    dictionary.setLanguage("no");
    test(JSON.stringify(dictionary.languagefiles) === JSON.stringify(languages), "Testing setting of languages");
}


async function testTranslating(){
    const languages = ["./test/lan/no.json", "./test/lan/en.json"];
    const dictionary = new Dictionary(...languages);
    await dictionary.setLanguage("no");

    test(dictionary.translate("end") === "Nå er det slutt", "Testing translating Norwegian");
    await dictionary.setLanguage("en")
    test(dictionary.translate("end") === "This is the end", "Testing translating English");

}

function test(test, description) {
    if (test) {
        console.log(`🟢 ${description}`)
    } else {
        console.log(`🔴 ${description},  ${test}`)
    }
}