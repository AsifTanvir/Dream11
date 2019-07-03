(function() {
  /* This method is to match two input elements */

jQuery.validator.addMethod("match", function(value, element, options) {

    if (value === $(options).val()) {
        return true;
    } else {
        return false;
    }
}, "Elements do not match");

/* This methods looksup an element in a database or another source */

jQuery.validator.addMethod("lookup", function(value, element, options) {

    var url = options.pro + '?table=' + options.table + '&field=' + options.field + '&action=lookup&value=' + value;

    feedback = $.ajax({
        url: url,
        async: false,
        dataType: 'json',
    }).responseText;
    if (feedback == 'true') {
        return true;
    } else {
        return false
    }
}, "Invalid input");


/* This methods looks for duplicates in a database or another source */

jQuery.validator.addMethod("duplicate", function(value, element, options) {

    var url = options.pro + '?table=' + options.table + '&field=' + options.field + '&action=duplicate&value=' + value;

    feedback = $.ajax({
        url: url,
        async: false,
        dataType: 'json',
    }).responseText;
    if (feedback == 'true') {
        return true;
    } else {
        return false
    }
}, "Record already exist");
});