
function init() {

d3.json('samples.json').then(sampledata => {
    console.log(sampledata);


    //create variables for samples
    //Sample Values
    var sample_values = sampledata.samples[0].sample_values;
    console.log(sample_values);
    //Ids
    var otu_ids = sampledata.samples[0].otu_ids;
    console.log(otu_ids);
    // labels
    var otu_labels = sampledata.samples[0].otu_labels;
    console.log(otu_labels);

    


    //Horizontal Bar Chart

    var bar_ids = otu_ids.slice(0,10).map(d => 'OTU '+ d).reverse();
    console.log("Top 10 IDs: "+ bar_ids);

    var bar_labels = sampledata.samples[0].otu_labels.slice(0,10).reverse();
    console.log("labels:" + bar_labels);

    //sort and slice for top 10
    var bar_sortedValues = sample_values.sort((a, b) => b-a).slice(0,10).reverse();
    console.log("Sorted Values:" + bar_sortedValues);

    var trace1 = {
        x: bar_sortedValues,
        y: bar_ids,
        text: bar_labels,
        type: "bar", 
        orientation: "h"
    };

    var data = [trace1]
    
    var layout = {
        title: "Top 10 Belly Button Bacteria (Bar)",
        yaxis:{
            tickmode:"linear",
        },
        margin: {
            l: 100,
            r: 100,
            t: 100,
            b: 100
          }
    };
    
    Plotly.newPlot('bar', data, layout);

    
    
    //buble Chart
    var trace2 = {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
            color: otu_ids,
            size: sample_values,
            sizeref: 2.0 * Math.max(...sample_values) / (100**2),
            opacity: [.65],
            sizemode: 'area',
            line: {
                color: "#ffffff",
                width: 1,
            }
        },
        type: 'scatter'

    };
    
    var data2 = [trace2];
    
    var layout2 = {
        title: "Top 10 Belly Button Bacteria (Bubble)",
        showlegend: false,
    }

    Plotly.newPlot('bubble', data2, layout2)

    //display metadata

    var meta_data = d3.map(sampledata.metadata[0]).entries()
    console.log(meta_data)

    var ul_meta = d3.select("#sample-metadata").append("ul").attr("id", "ul-meta-data");
    console.log(sampledata.metadata[0]);
    
    d3.select("#ul-meta-data")
        .selectAll("li")
        .data(meta_data)
        .enter()
        .append("li")
        .text(function(d) {
            return `${d.key} : ${d.value}`
    
        });



});



}

init()
