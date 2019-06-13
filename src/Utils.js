const account = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 100, 50];

const ERR_INVALID_SEPARATOR = "Invalid Separator";
const ERR_VALID_CHAR_WRONG_POSITION = "Valid character in wrong position";
const ERR_MISSING_VALUE = "Missing value";

const doValidation = (value) => {
    const number_format = [
        /^[0-9]+(\.[0-9]{1,3})?$/g,
        /(Rp)(\s?)+[0-9]{1,}$/g,
        /(Rp)+([0-9]{1,})+(\.[0-9]{1,3})+(\,0{1,})$/g,
        /(Rp)\s+([0-9]{1,})+(\.[0-9]{1,3})+(\,0{1,})?$/g
    ];

    const invalid_format = [
        {
            format: /(^[0-9]{1,})+(\,[0-9]{1,})$/g,
            message: ERR_INVALID_SEPARATOR
        },
        {
            format: /(^[0-9]{1,})+(\,[0-9]{1,})+(\.0{1,})$/g,
            message: ERR_INVALID_SEPARATOR
        },
        {
            format: /(^[0-9]{1,})+\s+([0-9]{1,3})/g,
            message: ERR_INVALID_SEPARATOR
        },
        {
            format: /(^[0-9]{1,})\sRp/g,
            message: ERR_VALID_CHAR_WRONG_POSITION
        },
        {
            format: /(Rp)\s?/g,
            message: ERR_MISSING_VALUE
        }
    ];

    for(var format of number_format){
        if(format.test(value)) return { message: "success" };
    }

    for(var invalid of invalid_format){
        if(invalid.format.test(value)) return invalid;
    }

    return {
        message: "Invalid input"
    };
};

const doRemoveNonNumbers = (value) => {
    value = value.replace(/\,0{1,}/g, '');
    value = value.replace(/\D/g, '');

    return value;
};

const doAddingCurrency = (value) => {
    var number = new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', useGrouping: false });
    return number.format(value).replace(/\,0{1,}/g, '').replace(/\s/g,'');
};

const doDenominations = (value) => {
    var tmp_results = [];
    account.forEach(number => {
        var tmp = value;
        var sub = [];
        if(tmp >= number){
        	var loop = true;
            while(loop){
            	var sub_tmp = tmp - number;
                if(sub_tmp >= 0){
                	sub.push(number);
                    tmp = sub_tmp;
                }else{
                	loop = false;
                }
            }

            value = value - sub.reduce((total, num) => total + num);
            tmp_results.push(sub);
        }
    });
    
    if(value > 0) tmp_results.push([value]);
    
    return tmp_results;
};

export {
    account,
    doValidation,
    doRemoveNonNumbers,
    doDenominations,
    doAddingCurrency
};