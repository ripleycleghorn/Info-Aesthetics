Highcharts.chart('container', {
    chart: {
        type: 'bar'
    },
    title: {
        text: 'Reasons for Not Wanting to Vote'
    },
    xAxis: {
        categories: ['I’m not interested in what is happening in government.','I just don’t think about doing it.','Voting has little to do with the way real decisions are made. ', 'I just don’t think about doing it.', 'I don’t see a difference between the candidates or parties.','I don’t like any of the candidates on the ballot.','I’m not informed enough about the candidates or issues to make a good decision. ','I dislike politics.','My one vote isn’t going to affect how things turn out. ','I have been unable to vote due to a disability or language barrier. ','I am too busy to vote.','My religion discourages voting. ']
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
        data: [298,335,227,335,294,265,337,193,246,505,434,461]
    }, {
        name: 'Major',
        data: [104,97,201,97,137,177,94,227,167,19,33,78]
    }, {
        name: 'Minor',
        data: [161,131,134,131,130,120,132,143,149,36,95,23]
    }]
});