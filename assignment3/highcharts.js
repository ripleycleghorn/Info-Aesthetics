Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Reasons for Not Wanting to Vote'
    },
    xAxis: {
        categories: ['I dislike politics. ','Voting has little to do with the way real decisions are made. ','My one vote isn’t going to affect how things turn out. ','I don’t like any of the candidates on the ballot. ','I don’t see a difference between the candidates or parties.','I’m not interested in what is happening in government. ','I just don’t think about doing it. ','I’m not informed enough about the candidates or issues to make a good decision. ','I am too busy to vote.','My religion discourages voting. ','I have been unable to vote due to a disability or language barrier. ']
    },
    yAxis: {
        min: 0,
        title: {
            text: 'Number of Respondents'
        }
    },
    legend: {
        reversed: true
    },
    plotOptions: {
        series: {
            stacking: 'normal'
        }
    },
    colors:['#C7C3BE', "#829FD9", "#230A59"],
    series: [{
        name: 'Not',
        data: [193,227,246,265,294,298,335,337,434,461,505]
    }, {
        name: 'Minor',
        data: [143,134,149,120,130,161,131,132,95,23,36]
    }, {
        name: 'Major',
        data: [227,201,167,177,137,104,97,94,33,78,19]
    }]
});