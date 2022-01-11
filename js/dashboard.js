$.when($.ready).then(function() {

  $.ajax({
      url: 'data/showRequests.php',
      type: 'GET',
      data: { status: "Ожидает загрузки" },
      success: function(data){
         $('#waitUploadTable').html(data);
      }
  }); 

new Chart(document.getElementById("line-chart"), {
  type: 'line',
  data: {
    labels: [10.01,11.01,12.01,13.01,14.01],
    datasets: [{ 
        data: [5,10,7,8,5],
        label: "ФЛ",
        borderColor: "#198754",
        backgroundColor: "#198754",
        fill: false
      }, { 
        data: [2,3,5,3,2],
        label: "ЮЛ",
        borderColor: "#ffc107",
        backgroundColor: "#ffc107",
        fill: false
      }, { 
        data: [10,12,15,10,6],
        label: "СМЭВ",
        borderColor: "#dc3545",
        backgroundColor: "#dc3545",
        fill: false
      }
    ]
  },
  options: {
    title: {
      display: false,
      text: 'Поступление запрос за текущую неделю'
    }
  }
});

});

$("#waitUploadTable").on('click','tr',function(){
    $('#numReq').removeClass('is-invalid');
    $('#numReq').val($(this).find('td').eq(0).text());
});

$("#waitUploadTable").on('click','a',function(){
    window.open('/tpl/form'+$(this).parents().find('td').eq(1).text()+'.php?numLog='+$(this).html(), '_blank');
});

$("input[name=reqFiles]").change(function() {
    $('#reqFiles').removeClass('is-invalid');
    let names = [];
    let text = '';
    for (var i = 0; i < $(this).get(0).files.length; ++i) {
        names.push($(this).get(0).files[i].name);
    }
    $.each(names, function( index, value ) {
      text = text + value + '<br>';
    });
    $("#nameFiles").html(text);
});


$("#upload").click(function() {
  if ($('#numReq').val() == '') {
  $('#numReq').addClass('is-invalid');
  return;
  }

  if ($('#reqFiles').val() == '') {
  $('#reqFiles').addClass('is-invalid');
  return;
  }  

    // upload files
    let num = $('#numReq').val();
    let data = new FormData();
    $.each($('#reqFiles')[0].files, function(i, file) {
        data.append('file[]', file);
    });
    data.append('num', num);

    $.ajax({
        url: 'data/upload.php',
        data: data,
        cache: false,
        contentType: false,
        processData: false,
        method: 'POST',
        success: function(data){
            if (data.split(" ")[0] == 'Ошибка') {
                window.location.replace("index.php?error="+data);
            } else {
                window.location.replace("index.php?success="+data);
            }
        }
    });

});