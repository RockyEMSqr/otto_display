import { DateTime } from "luxon";
import { h } from 'preact';

function getDT(val) {
    let dt: DateTime = null as any;
    if (val) {
        if (val.constructor.name == 'Number') {
            dt = DateTime.fromMillis(val);
        }
        else if (val.constructor.name == "String") {
            dt = DateTime.fromISO(val);
        } else if (val.constructor.name == "Date") {
            dt = DateTime.fromJSDate(val);
        }
    }
    return dt

}
function formatPhoneNumber(s) {
    console.info('handle formatting beetter.')
    var s2 = ("" + s).replace(/\D/g, '');
    var m = s2.match(/^(\d{3})(\d{3})(\d{4})$/);
    return (!m) ? null : "(" + m[1] + ") " + m[2] + "-" + m[3];
}
export function date(val: Date | string | number) {
    if (!val) return null;
    return getDT(val).toFormat('MM/dd/yyyy');
}
export function datetime(val) {
    if (!val) return null;
    return getDT(val).toFormat('MM/dd/yyyy hh:mm a');
}
export function time(val) {
    if (!val) return null;
    return getDT(val).toFormat('hh:mm a');
}
export function phone(str) {
    return <span><a href={`tel:${str}`}>{formatPhoneNumber(str)}</a></span>
}
export function email(str) {
    return <span><a href={`mailto:${str}`}>{str}</a></span>
}
export function usd(val) {
    let c = 2, d = '.', t = ',';
    c = isNaN(c = Math.abs(c)) ? 2 : c;
    d = d == undefined ? "." : d;
    t = t == undefined ? "," : t;
    let s = val < 0 ? "-" : "";
    let i = parseInt(val = Math.abs(+val || 0).toFixed(c)) + "";
    let iNum = Number(i);
    let j;
    j = (j = i.length) > 3 ? j % 3 : 0;
    return s + (j ? i.substr(0, j) + t : "")
        + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t)
        + (c ? d + Math.abs(val - iNum).toFixed(c).slice(2) : "");
}
export function upload(upload, url) {
    if (upload.mimetype.indexOf('image') > -1) {
        return <img width={150} src={`${url}/v/${upload._id}`} title={upload.originalname} />
    }
    if (upload.mimetype.indexOf('application/pdf') > -1) {
        return <embed src={`${url}/v/${upload._id}`} title={upload.originalname} />
    }

    return <a target="_blank" href={`${url}/d/${upload._id}`}>Download</a>

}
export function percent(v:number){
    if(!v){
        return null;
    }
    return v.toFixed(2) + '%';
}
export default { _d: date, usd, _dt: datetime, _t: time, phone, email, upload, percent }