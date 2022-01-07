    <!-- start: Javascript -->
    <script src="<?php echo base_Url()?>/asset/js/jquery.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/jquery.ui.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/bootstrap.min.js"></script>

    <!-- plugins -->
    <script src="<?php echo base_Url()?>/asset/js/plugins/moment.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.knob.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.datatables.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/datatables.bootstrap.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/bootstrap-material-datetimepicker.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/fullcalendar.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.nicescroll.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.vmap.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/maps/jquery.vmap.world.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.vmap.sampledata.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/chart.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/ion.rangeSlider.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.mask.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/select2.full.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/nouislider.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jquery.validate.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/xlsx.full.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/FileSaver.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/dropzone.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/shim.min.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/plugins/jszip.js"></script>

    <!-- DataTable -->
    <script src="https://cdn.datatables.net/buttons/1.7.0/js/dataTables.buttons.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jszip/3.1.3/jszip.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/pdfmake.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.53/vfs_fonts.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.html5.min.js"></script>
    <script src="https://cdn.datatables.net/buttons/1.7.0/js/buttons.print.min.js"></script>

    <!-- custom -->
     <script src="<?php echo base_Url()?>/asset/js/main.js"></script>
     <script src="<?php echo base_Url()?>/asset/js/util.js"></script>
    <script src="<?php echo base_Url()?>/asset/js/indexeddb.js"></script>
     
     <!-- my -->
     <script src="<?php echo base_Url()?>/asset/js/my/createTable.js"></script>
     <script src="<?php echo base_Url()?>/asset/js/my/puntoventa.js"></script>
     <script src="<?php echo base_Url()?>/asset/js/my/productos.js"></script>
     <script src="<?php echo base_Url()?>/asset/js/my/capacitacion.js"></script>


    <script type="text/javascript">
        window.base_url = <?php echo json_encode(base_url());?>;
        $(document).ready(function(){
            //CREACIÓN DE TABLAS
            
            //ESCUDERIA NO COMENTAR
            let datosPuntoVenta=[];
            if ($('#tableEscuderia').length > 0) {
                var starCountRef = firebase.database().ref('tbl_puntoventa');
                starCountRef.on('value', (snapshot) => {
                    if(snapshot.exists()){
                        datosPuntoVenta=[];
                        const data = snapshot.val();
                        for (const key in data) {
                            const element = data[key];
                            element.ESCUDERIA = key;
                            datosPuntoVenta.push(element);
                        }
                    }
                    setTimeout(function(){
                        $('#tableEscuderia').html(generarTablaPuntoVenta(datosPuntoVenta));
                        $('#datatables-generic0').DataTable({
                            "scrollX": true,
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                    }, 250);
                });
            }
            //FICHA TÉCNICA
            let datosFichatec=[];
            if ($('#tableFichaTecnica').length > 0) {
                var starCountRef = firebase.database().ref('tbl_fichatecnica');
                starCountRef.on('value', (snapshot) => {
                    if(snapshot.exists()){
                        datosFichatec=[];
                        const data = snapshot.val();
                        for (const key in data) {
                            const element = data[key];
                            element.CODIGO = key;
                            datosFichatec.push(element);
                        }
                    }
                    setTimeout(function(){
                        $('#tableFichaTecnica').html(generarFichaTecnica(datosFichatec));
                        $('#datatables-generic0').DataTable({
                            "scrollX": true,
                            dom: 'Bfrtip',
                            buttons: [
                                'copy', 'csv', 'excel', 'pdf', 'print'
                            ]
                        });
                    }, 250);
                });
            }

            //CAPACITACIÓN
            let datosCapacitacion=[];
            if ($('#capacitacionDatos').length > 0) {
                var starCountRef = firebase.database().ref('tbl_tutoriales');
                starCountRef.on('value', (snapshot) => {
                    if(snapshot.exists()){
                        datosCapacitacion=[];
                        const data = snapshot.val();
                        for (const key in data) {
                            const element = data[key];
                            for (const k in element) {
                                const e = element[k];
                                e.CODIGO = key;
                                datosCapacitacion.push(e);
                            }
                        }
                    }
                    setTimeout(function(){
                        $('#capacitacionDatos').html(generarCapacitacion(datosCapacitacion));
                    }, 250);
                });
            }       
            
            //ELEMENTOS ADICIONALES
            $('.dateAnimate').bootstrapMaterialDatePicker({ weekStart : 0, time: false, animation:true, minDate:new Date()});
        });

      (function(jQuery){

        // start: Chart =============

        Chart.defaults.global.pointHitDetectionRadius = 1;
        Chart.defaults.global.customTooltips = function(tooltip) {

            var tooltipEl = $('#chartjs-tooltip');

            if (!tooltip) {
                tooltipEl.css({
                    opacity: 0
                });
                return;
            }

            tooltipEl.removeClass('above below');
            tooltipEl.addClass(tooltip.yAlign);

            var innerHtml = '';
            if (undefined !== tooltip.labels && tooltip.labels.length) {
                for (var i = tooltip.labels.length - 1; i >= 0; i--) {
                    innerHtml += [
                        '<div class="chartjs-tooltip-section">',
                        '   <span class="chartjs-tooltip-key" style="background-color:' + tooltip.legendColors[i].fill + '"></span>',
                        '   <span class="chartjs-tooltip-value">' + tooltip.labels[i] + '</span>',
                        '</div>'
                    ].join('');
                }
                tooltipEl.html(innerHtml);
            }

            tooltipEl.css({
                opacity: 1,
                left: tooltip.chart.canvas.offsetLeft + tooltip.x + 'px',
                top: tooltip.chart.canvas.offsetTop + tooltip.y + 'px',
                fontFamily: tooltip.fontFamily,
                fontSize: tooltip.fontSize,
                fontStyle: tooltip.fontStyle
            });
        };
        var randomScalingFactor = function() {
            return Math.round(Math.random() * 100);
        };
        var lineChartData = {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [{
                label: "My First dataset",
                fillColor: "rgba(21,186,103,0.4)",
                strokeColor: "rgba(220,220,220,1)",
                pointColor: "rgba(66,69,67,0.3)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(220,220,220,1)",
                 data: [18,9,5,7,4.5,4,5,4.5,6,5.6,7.5]
            }, {
                label: "My Second dataset",
                fillColor: "rgba(21,113,186,0.5)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: [4,7,5,7,4.5,4,5,4.5,6,5.6,7.5]
            }]
        };

        var doughnutData = [
                {
                    value: 300,
                    color:"#129352",
                    highlight: "#15BA67",
                    label: "Alfa"
                },
                {
                    value: 50,
                    color: "#1AD576",
                    highlight: "#15BA67",
                    label: "Beta"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#15BA67",
                    label: "Gamma"
                },
                {
                    value: 40,
                    color: "#0F5E36",
                    highlight: "#15BA67",
                    label: "Peta"
                },
                {
                    value: 120,
                    color: "#15A65D",
                    highlight: "#15BA67",
                    label: "X"
                }

            ];


        var doughnutData2 = [
                {
                    value: 100,
                    color:"#129352",
                    highlight: "#15BA67",
                    label: "Alfa"
                },
                {
                    value: 250,
                    color: "#FF6656",
                    highlight: "#FF6656",
                    label: "Beta"
                },
                {
                    value: 100,
                    color: "#FDB45C",
                    highlight: "#15BA67",
                    label: "Gamma"
                },
                {
                    value: 40,
                    color: "#FD786A",
                    highlight: "#15BA67",
                    label: "Peta"
                },
                {
                    value: 120,
                    color: "#15A65D",
                    highlight: "#15BA67",
                    label: "X"
                }

            ];

        var barChartData = {
                labels: ["January", "February", "March", "April", "May", "June", "July"],
                datasets: [
                    {
                        label: "My First dataset",
                        fillColor: "rgba(21,186,103,0.4)",
                        strokeColor: "rgba(220,220,220,0.8)",
                        highlightFill: "rgba(21,186,103,0.2)",
                        highlightStroke: "rgba(21,186,103,0.2)",
                        data: [65, 59, 80, 81, 56, 55, 40]
                    },
                    {
                        label: "My Second dataset",
                        fillColor: "rgba(21,113,186,0.5)",
                        strokeColor: "rgba(151,187,205,0.8)",
                        highlightFill: "rgba(21,113,186,0.2)",
                        highlightStroke: "rgba(21,113,186,0.2)",
                        data: [28, 48, 40, 19, 86, 27, 90]
                    }
                ]
            };

         window.onload = function(){
                var ctx = $(".doughnut-chart")[0].getContext("2d");
                window.myDoughnut = new Chart(ctx).Doughnut(doughnutData, {
                    responsive : true,
                    showTooltips: true
                });

                var ctx2 = $(".line-chart")[0].getContext("2d");
                window.myLine = new Chart(ctx2).Line(lineChartData, {
                     responsive: true,
                        showTooltips: true,
                        multiTooltipTemplate: "<%= value %>",
                     maintainAspectRatio: false
                });

                var ctx3 = $(".bar-chart")[0].getContext("2d");
                window.myLine = new Chart(ctx3).Bar(barChartData, {
                     responsive: true,
                        showTooltips: true
                });

                var ctx4 = $(".doughnut-chart2")[0].getContext("2d");
                window.myDoughnut2 = new Chart(ctx4).Doughnut(doughnutData2, {
                    responsive : true,
                    showTooltips: true
                });

            };
        
        //  end:  Chart =============

        // start: Calendar =========
         $('.dashboard .calendar').fullCalendar({
            header: {
                left: 'prev,next today',
                center: 'title',
                right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: '2015-02-12',
            businessHours: true, // display business hours
            editable: true,
            events: [
                {
                    title: 'Business Lunch',
                    start: '2015-02-03T13:00:00',
                    constraint: 'businessHours'
                },
                {
                    title: 'Meeting',
                    start: '2015-02-13T11:00:00',
                    constraint: 'availableForMeeting', // defined below
                    color: '#20C572'
                },
                {
                    title: 'Conference',
                    start: '2015-02-18',
                    end: '2015-02-20'
                },
                {
                    title: 'Party',
                    start: '2015-02-29T20:00:00'
                },

                // areas where "Meeting" must be dropped
                {
                    id: 'availableForMeeting',
                    start: '2015-02-11T10:00:00',
                    end: '2015-02-11T16:00:00',
                    rendering: 'background'
                },
                {
                    id: 'availableForMeeting',
                    start: '2015-02-13T10:00:00',
                    end: '2015-02-13T16:00:00',
                    rendering: 'background'
                },

                // red areas where no events can be dropped
                {
                    start: '2015-02-24',
                    end: '2015-02-28',
                    overlap: false,
                    rendering: 'background',
                    color: '#FF6656'
                },
                {
                    start: '2015-02-06',
                    end: '2015-02-08',
                    overlap: true,
                    rendering: 'background',
                    color: '#FF6656'
                }
            ]
        });
        // end : Calendar==========

        // start: Maps============

          jQuery('.maps').vectorMap({
            map: 'world_en',
            backgroundColor: null,
            color: '#fff',
            hoverOpacity: 0.7,
            selectedColor: '#666666',
            enableZoom: true,
            showTooltip: true,
            values: sample_data,
            scaleColors: ['#C8EEFF', '#006491'],
            normalizeFunction: 'polynomial'
        });

        // end: Maps==============

      })(jQuery);
     </script>
  <!-- end: Javascript -->
  </body>
</html>