




    d3.json('samples.json').then(function(sampledata){
        console.log(sampledata["metadata"]);

        var new_wfreq = sampledata["metadata"].filter(function(samples) {
            console.log(samples);
            return samples.id === 940;
        })
            wfreq = new_wfreq[0].wfreq;

    console.log(wfreq);


    var gauge_data = [
        {
            domain: { x: [0, 1], y: [0, 1] },
            value: wfreq,
            title: { text: "Wash Frequency" },
            type: "indicator",
            mode: "gauge+number"
        }
    ];

    var layout = { width: 600, height: 500, margin: { t: 0, b: 0 } };

    Plotly.newPlot('gauge', gauge_data, layout);

    }); 
