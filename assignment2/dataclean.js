d3.json("data/lasthour.json").then(data => {

    d.geometry.coordinates.array.forEach(item => {
        item.toString()
        if(item[0].contains("-")) {
            item[0].replace("-", "W ")
        };
        if(item[1].contains("-")) {
            item[1].replace("-", "S ")
        };
    });

})