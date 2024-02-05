<!tag @table table>

<@table data=state.data columns=state.columns @select{
    console.log(event.detail);
}/>

<!style>
    :host {
        font-family: arial;
    }

<!state>
    columns: [
        { id: 'date', type: 'date', caption: 'Date', view: { style: 'width:60px' } },
        { id: 'state', type: 'string', caption: 'Status', view: { style: value => {
            const style = 'width:120px;text-align:center;';
            if(value === 'In progress') return style + 'background:#f5fff0';
            if(value === 'Closed')      return style + 'background:#327dec;color:white';
            if(value === 'Funded')      return style + 'background:#d7ec32';
            if(value === 'Canceled')    return style + 'background:#ff7dbb';
            return style;
        }} },

        { id: 'total', type: 'currency', caption: 'Total', view: { style: 'width:100px;text-align:right;font-weight:bold' } },
        { id: 'delta', type: 'knum', caption: 'Margin', view: { style: value => 'width:100px;text-align:right;font-weight:bold;color:'+(Number(value) <0 ? 'red' : 'green') } },
        { id: 'bonus', type: 'knum', caption: 'Bonus', view: { style: 'width:100px;text-align:right;font-weight:bold;color:#880000' } },

        { id: 'purchase', type: 'knum', caption: 'Net cost', view: { style: 'width:60px;text-align:right;color:gray' } },
        { id: 'rentability', type: 'currency', caption: 'Profitability', view: { fraction: 1, style: 'width:60px;font-weight:bold;text-align:right', suffix: '%' } },
        { id: 'margin', type: 'currency', caption: 'Markup', view: { fraction: 1, style: 'width:60px;font-weight:bold;text-align:right', suffix: '%' } },


        { id: 'description', type: 'string', caption: 'Description', view: { style: 'max-width:200px;text-overflow:ellipsis;overflow: hidden;' }  },
        { id: '_key', type: 'string', caption: '_key', view: { style: 'width:100px' } },
        { id: '_client', type: 'string', caption: '_client' },
    ],
    data: [{
        "id": "e2e46807-65a2-4504-9863-76ac22ddc399",

        "date_created": "2024-01-18T13:27:41.700Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-12-11",
        "counteragent": null,
        "description": "Very very very very very very very very very very very very very very very very very long descriptionn",
        "state": "In progress",
        "purchase": "9673400.00",
        "delta": "638300.00",
        "total": "10311700.00",
        "rentability": "6.19",
        "margin": "6.60",
        "bonus": "0.00",
        "_key": "14581533",
        "_client": "1083985",

    }, {
        "id": "b77e3f17-497d-4b17-8dd6-0cd2532826c7",

        "date_created": "2024-01-18T13:27:41.620Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-28",
        "counteragent": null,
        "description": "",
        "state": "In progress",
        "purchase": "2484638.00",
        "delta": "152900.00",
        "total": "2637538.00",
        "rentability": "5.80",
        "margin": "6.15",
        "bonus": "0.00",
        "_key": "14330768",
        "_client": "11298865",

    }, {
        "id": "8f97861d-ee2c-4ba9-9082-6169d8b74a04",

        "date_created": "2024-01-18T13:27:41.536Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-28",
        "counteragent": null,
        "description": "",
        "state": "In progress",
        "purchase": "60800.00",
        "delta": "5080.00",
        "total": "65880.00",
        "rentability": "7.71",
        "margin": "8.36",
        "bonus": "0.00",
        "_key": "14328830",
        "_client": "1083985",

    }, {
        "id": "1bccfaf1-66db-4da3-81d3-7718fb973a5a",

        "date_created": "2024-01-18T13:27:41.121Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-22",
        "counteragent": null,
        "description": "",
        "state": "In progress",
        "purchase": "174999.52",
        "delta": "15160.48",
        "total": "190160.00",
        "rentability": "7.97",
        "margin": "8.66",
        "bonus": "0.00",
        "_key": "14055329",
        "_client": "1256290",

    }, {
        "id": "2eb34821-6448-425a-828f-e9683580dcdb",

        "date_created": "2024-01-18T13:27:41.193Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-20",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "9800.00",
        "delta": "980.00",
        "total": "10780.00",
        "rentability": "9.09",
        "margin": "10.00",
        "bonus": "0.00",
        "_key": "14063241",
        "_client": "6757840",

    }, {
        "id": "882dae7e-33f0-48ed-bd74-a0ebce03471f",

        "date_created": "2024-01-18T13:27:40.813Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-17",
        "counteragent": null,
        "description": "",
        "state": "In progress",
        "purchase": "633868.95",
        "delta": "60326.05",
        "total": "694195.00",
        "rentability": "8.69",
        "margin": "9.52",
        "bonus": "0.00",
        "_key": "13807771",
        "_client": "97357",

    }, {
        "id": "21cb1c72-e93f-41b4-997d-62ed7defe67a",

        "date_created": "2024-01-18T13:27:40.962Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-16",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "61656.00",
        "delta": "0.00",
        "total": "61656.00",
        "rentability": "0.00",
        "margin": "0.00",
        "bonus": "0.00",
        "_key": "14056070",
        "_client": "9644732",

    }, {
        "id": "a2caab08-bffc-4cc9-ae5c-834b9b786ec7",

        "date_created": "2024-01-18T13:27:40.885Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-15",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "74980.00",
        "delta": "20324.00",
        "total": "95304.00",
        "rentability": "21.33",
        "margin": "27.11",
        "bonus": "0.00",
        "_key": "14055741",
        "_client": "13029579",

    }, {
        "id": "f0d8c01c-7c1b-41a1-b735-34e7f210767d",

        "date_created": "2024-01-18T13:27:41.446Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-10",
        "counteragent": null,
        "description": "",
        "state": "In progress",
        "purchase": "524615.78",
        "delta": "-475615.78",
        "total": "696631.91",
        "rentability": "-68.27",
        "margin": "-90.66",
        "bonus": "647631.91",
        "_key": "14318535",
        "_client": "97416",

    }, {
        "id": "71a53f02-ea65-45ff-b4c0-29e4d80208a7",

        "date_created": "2024-01-18T13:27:40.427Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-10",
        "counteragent": null,
        "description": "",
        "state": "Funded",
        "purchase": "1806500.00",
        "delta": "1266627.00",
        "total": "3073127.00",
        "rentability": "41.22",
        "margin": "70.11",
        "bonus": "0.00",
        "_key": "13635872",
        "_client": "9644732",

    }, {
        "id": "0dd0358f-272d-4fb6-8a87-ee74ab5cbf10",

        "date_created": "2024-01-18T13:27:40.502Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-09",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "100000.00",
        "delta": "13700.00",
        "total": "113700.00",
        "rentability": "12.05",
        "margin": "13.70",
        "bonus": "0.00",
        "_key": "13636636",
        "_client": "1083985",

    }, {
        "id": "9bf1f48d-24fe-465a-a54e-48ac683e7cf4",

        "date_created": "2024-01-18T13:27:40.580Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-09",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "145364.00",
        "delta": "5316.00",
        "total": "150680.00",
        "rentability": "3.53",
        "margin": "3.66",
        "bonus": "0.00",
        "_key": "13803876",
        "_client": "7383482",

    }, {
        "id": "5c509386-7419-4d35-87fd-b94002779c55",

        "date_created": "2024-01-18T13:27:41.041Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-09",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "84341.25",
        "delta": "22488.75",
        "total": "106830.00",
        "rentability": "21.05",
        "margin": "26.66",
        "bonus": "0.00",
        "_key": "14056655",
        "_client": "1402489",

    }, {
        "id": "89c842b7-13f4-4343-836f-6f9b62d7e465",

        "date_created": "2024-01-18T13:27:39.885Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-11-03",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "7508.64",
        "delta": "408.36",
        "total": "7917.00",
        "rentability": "5.16",
        "margin": "5.44",
        "bonus": "0.00",
        "_key": "13545269",
        "_client": "1083985",

    }, {
        "id": "482f817b-fcf9-4803-9072-b7213bb72180",

        "date_created": "2024-01-18T13:27:39.430Z",
        "user_updated": null,
        "date_updated": null,
        "date": "2023-10-30",
        "counteragent": null,
        "description": "",
        "state": "Closed",
        "purchase": "121772.16",
        "delta": "1399.68",
        "total": "123171.84",
        "rentability": "1.14",
        "margin": "1.15",
        "bonus": "0.00",
        "_key": "13107469",
        "_client": "5707226",

    }]
