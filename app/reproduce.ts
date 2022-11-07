import { HandlerBasedContract, LoggerFactory, WarpFactory } from "warp-contracts";
// import {LevelDbCache} from 'warp-contracts';

// const level = new LevelDbCache({ dbLocation: "./.swcache", inMemory: false });
// console.log(level);
// LoggerFactory.INST.logLevel("debug");
// (async function () {
//     const warp = WarpFactory.forMainnet({ dbLocation: "./.swcache", inMemory: false });
//     let res = await warp.levelDb.get("JnPMxlTvHtdMsEHgTJrhYvoBL33f_-FfNPt6a9qhaF4",
// "000001016309,1663164632896,a943cda409b160d447f40c1a2426b66d79923c2080cf65a62bddc224ba201338");

// if (res != null) {
//     console.log(res.cachedValue.state);
// }


// })();

console.log("Reproduce...");


(async function () {

    const warp = WarpFactory.forMainnet({ dbLocation: "./.swcache", inMemory: true });

    const bARContract = new HandlerBasedContract("JnPMxlTvHtdMsEHgTJrhYvoBL33f_-FfNPt6a9qhaF4", warp);
    //const { cachedValue: { state } }
    let result = await bARContract.readState(
        //"000001016309,1663164632896,a943cda409b160d447f40c1a2426b66d79923c2080cf65a62bddc224ba201338"
        "000001010248,0000000000000,795b431273a18adb13e437519851ac7f5a3ad3dcc362cfe6df1b59198b9c9387"
        );
    //console.log(result);
})();

//ZE0N-8P9gXkhtK-07PQu9d8me5tGDxa_i4Mee5RzVYg:215263758.65018985



// allow
// yrrMtRF7umiGdfqAwNh_kWTbrV4aiydrPItISGxYER4
// createOrder
// u0VPKL9NS0UkEROHUh8fYdgLRhxpwetit8JcDSzyv6Y
// createOrder
// ZhhawVFEf09imqppu9en3hpbfydOYPR6XXXEB782_uo
// allow
// r8Ef0I2DW35V1fz1PqQqefUVdnZv8OIbsQApIOBrUvY
// createOrder
// 1BnTm-t8TXaYfAzVoEx_vQi5AqQiv9kXUSsJ2js1pL0
// allow
// yQlX1oNj3Any2231j5-6HVGkT1X_IiurOq1lwg0eyP4