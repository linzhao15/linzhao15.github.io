<!DOCTYPE html>
<html>
<meta charset="utf-8">
<head>

    <link rel="stylesheet" href="css/css.css">
</head>

<body>
  <div>
    <h1 style="font-family:Georgia;
      color:#43353A;
      text-align:center;
       margin-top:25px;
       margin-right:35px;
       margin-left:35px;
       border: 0;
       background:#b0c4de;
       padding-top: 70px;
       padding-right: 0px;
       padding-bottom: 70px;
       padding-left: 0px;
       border:double
     ">London 1854 Cholera Interactive Map by John Snow
     <br>

    </h1>
  </div>
  <br>
  <h2 style="MARGIN-LEFT:35px;color:#43353A;font-family:Georgia">
    1. Dr. John Snow's Map
  </h2>
  <table border="0">
        <tr>
            <td width=1210 ><img src="http://farm5.staticflickr.com/4422/36543934664_3d80d17cc1_b.jpg" alt="Dr.John Snow's Map" width=500 height=500 HSPACE=30 VSPACE=10 align="left"/>
                <h3 style="color:#43353A;font-family:Times">Background</h3>
                  <p style="color:#584b50;font-family:Georgia;text-align:justify">
                  <br>
                  "In the mid-19th century, the Soho district of London had a serious problem with filth due to the large influx of people and a lack of proper sanitary services: the London sewer system had not reached Soho. Cowsheds, slaughter houses, and grease-boiling dens lined the streets and contributed animal droppings, rotting fluids and other contaminants to the primitive Soho sewer system. Many cellars had cesspools underneath their floorboards, which formed from the sewers and filth seeping in from the outside. Since the cesspools were overrunning, the London government decided to dump the waste into the River Thames, contaminating the water supply. London had already suffered from a "series of debilitating cholera outbreaks". These included outbreaks in 1832 and 1849 which killed a total of 14,137 people.
                  <br>
                  <br>
                  John Snow (15 March 1813 – 16 June 1858) was an English physician and a leader in the adoption of anaesthesia and medical hygiene. He is considered one of the fathers of modern epidemiology, in part because of his work in tracing the source of a cholera outbreak in Soho, London, in 1854. His findings inspired fundamental changes in the water and waste systems of London, which led to similar changes in other cities, and a significant improvement in general public health around the world."
                  <br>
                  <br>
                   - Wikipedia
               </p>

            </td>
        </tr>
  </table>
  <h2 style="MARGIN-LEFT:35px;color:#43353A;font-family:Georgia">
    2. Interactive Cholera Map
  </h2>
<br>
<br>
<div style="position: relative; width: 1660px;">
    <div style="display: inline-block; overflow: hidden; height: 855px; background-color: white; border-radius: 2px;border-color:gery">
        <div style="width: 750px; height: 710px; overflow: hidden;transform: rotate(0.8deg);">
            <svg id="map"></svg>
        </div>

    </div>
    <div style="display: inline-block;">
        <div style="position: relative; margin-top: 350px;">
            <svg id="lineChart" width="800" height="500" style="background-color: white">
                <defs>
                    <linearGradient id="lg" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:#629cff;stop-opacity:5" />
                        <stop offset="100%" style="stop-color:#fff;stop-opacity:0.4" />
                    </linearGradient>
                </defs>
            </svg>
            <div id="ms" flag = 'open'>close multi_sel</div>
        </div>
        <div><svg class="chart" width="800" height="350" style="background-color: white"></svg></div>
    </div>

    <div id="legend">
        <div style="display: inline-block;font-family:Georgia;font-size:12px;">
            <div class="hid" data-flag = 'age'>
                <div style="display: inline-block; margin-left: 60px;">
                    <div>
                        <div class="legend_img" style="border-color:#f1eef6"></div>&nbsp;0-10</div>
                    <div>
                        <div class="legend_img" style="border-color:#d4b9da"></div>&nbsp;11-20</div>
                    <div>
                        <div class="legend_img" style="border-color:#c994c7"></div>&nbsp;21-40</div>
                </div>
                <div style="display: inline-block"><div>
                    <div class="legend_img" style="border-color:#df65b0"></div>&nbsp;41-60</div>
                    <div>
                        <div class="legend_img" style="border-color:#dd1c77"></div>&nbsp;61-80</div>
                    <div>
                        <div class="legend_img" style="border-color:#980043"></div>&nbsp;&gt;80</div></div>

            </div>
            <div id="legend_age" class="legend" data-switch="off">Ages</div>
        </div>
        <div style="display: inline-block;font-family:Georgia;font-size:12px;">
            <div class="hid" data-flag = 'gender' style=" margin-left: 25px;">
                <div>
                    <div class="legend_img" style="border-color:#3bd5f7;" ></div>&nbsp;Male</div>
                <div>
                    <div class="legend_img" style="border-color:#ff6347;"></div>&nbsp;Female</div>
            </div>
            <div id="legend_gender" class="legend" data-switch="off">Gender</div>
        </div>
    </div>
</div>
<div id="tips">
    <div id="date"></div>
    <div id="d_n"></div>
</div>
<h2 style="MARGIN-LEFT:35px;color:#43353A;font-family:Georgia">

  3. <a href="https://linzhao15.github.io/documentation" target="_blank" style="text-decoration: none" onMouseOver="this.style.color='#cd5c5c'"
onMouseOut="this.style.color='#43353A'"}>Documentation</a>

</h2>


<script type="text/javascript">
            d3.select("body")
              .append("p");
</script>
<p></p>

<footer style="font-family:Georgia;
  color:#43353A;
  text-align:center;
   margin-top:25px;
   margin-right:35px;
   margin-left:35px;
  font-size:small
 ">
<p>&copy; 2017 Interactive Cholera Map by Lin Zhao</p>
<p>Email: <a href="zhao15@iu.edu" >zhao15@iu.edu</a></p>
</footer>
</body>
</html>
<script src="https://cdn.bootcss.com/jquery/3.2.1/jquery.js"></script>
<script src="js/d3.min.js"></script>
<script src="js/Drawing_Map_Pump_Street_Death_Zoom_test_800 with margin_09242017.js"></script>
<script src="js/js.js"></script>
