 
export async function  getData() {
    let SHEET_ID = '1srhXUSIu0zQs7ruMrNg4YwStBq40bsG0zoqG0vO_5hI'
    let SHEET_TITLE = 'festaagosto2026respostas';
    let SHEET_RANGE = 'a:t'

    let FULL_URL = ('https://docs.google.com/spreadsheets/d/' + SHEET_ID + '/gviz/tq?sheet=' + SHEET_TITLE + '&range=' + SHEET_RANGE);


    const response = await fetch(FULL_URL)
    const data = await response.text()
    const json = JSON.parse(data.substring(47).slice(0,-2));

    const cols = json.table.cols.map(col => col.label)
    
    const voluntarios = json.table.rows.map(row => {
        const obj = {};
        cols.forEach((col, index) => {
            const val = row.c[index]?.v;
            if (val) obj[col] = val;
        });
        return obj;
    })


    return {
        voluntarios: voluntarios,
        voluntariosDias: cols.slice(4)
    }
}