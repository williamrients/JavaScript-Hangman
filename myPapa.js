let words;

Papa.parse("dictionary.csv", {
    download: true,
    complete: function(results) {
        words = results.data;
    }
}); 