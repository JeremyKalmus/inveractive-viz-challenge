
function init(sample_values, otu_ids, otu_labels, meta_data) {

    var barChart = function(sample_values, otu_ids, otu_labels) {
        //Horizontal Bar Chart

    var bar_ids = otu_ids.slice(0,10).map(d => 'OTU '+ d).reverse();
    console.log("Top 10 IDs: "+ bar_ids);

    var bar_labels = otu_labels.slice(0,10).reverse();
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
};
barChart(sample_values, otu_ids, otu_labels);

var bubbleChart = function(sample_values, otu_ids, otu_labels){
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

    Plotly.newPlot('bubble', data2, layout2)}

    bubbleChart(sample_values, otu_ids, otu_labels);

    //display metadata
        var meta_data = d3.map(meta_data).entries();
        console.log(meta_data);
        
        
        var ul_meta = d3.select("#sample-metadata").attr("id", "ul-meta-data");
    
        d3.select("#ul-meta-data")
            .selectAll("p")
            .data(meta_data)
            .enter()
            .append("p")
            .text(function(d) {
                return `${d.key} : ${d.value}`
            });

    };

    


    

    
    



d3.selectAll("#selDataset").on("change", optionChanged);

var optionChanged = function(select) {
    console.log(select);

        d3.json('samples.json').then(function(sampledata){
            console.log(sampledata.samples);

        var new_sample = sampledata.samples.filter(function(samples) {
            console.log(samples);
            return samples.id === select;
        })
        console.log(new_sample);


        new_meta = sampledata.metadata.filter(function(meta_data){
            return meta_data.id == select;
        });
        console.log(new_meta);


        sample_values = new_sample[0].sample_values;
        otu_ids = new_sample[0].otu_ids;
        otu_labels = new_sample[0].otu_labels;
        meta_data = new_meta;

        init(sample_values, otu_ids, otu_labels, meta_data);


    })};



d3.json('samples.json').then(sampledata => {
    console.log(sampledata);
 //Sample Values for first
 var sample_values = sampledata.samples[0].sample_values;
 console.log(sample_values);
 //Ids
 var otu_ids = sampledata.samples[0].otu_ids;
 console.log(otu_ids);
 // labels
 var otu_labels = sampledata.samples[0].otu_labels;
 console.log(otu_labels);
 var meta_data = sampledata.metadata[0];
 console.log(meta_data);

 
    //populate dropdown with sample values: 
    var datasets = sampledata["names"];
    console.log(datasets);
    
    var drowndown_menu = function(names){
        
        var selectTag = d3.select("#selDataset")
        var menu_items = selectTag.selectAll("option").data(names);

        menu_items.enter().append('option')
        .attr('value', function(d){
            return d;
        })
        .text(function(d) {
            return d;
        });
    }

    drowndown_menu(sampledata.names);

    init(sample_values, otu_ids, otu_labels, meta_data);

});
