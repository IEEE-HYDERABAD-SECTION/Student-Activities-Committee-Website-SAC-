document.getElementById('header_from_js').innerHTML = '\
<header class="header mb-3">\
        <div id="top">\
            <div style="padding: 1px 10px;">\
            <div class = "row">\
                <div class="col-lg-2">\
                <a href="https://ieeehyderabad.org/"target="_blank" class="logo"><img src="images/hydsec.png" height="35px;"/></a>\
                </div>\
                <div class="col-lg-8">\
                    <div class="secname">\
                        <h6><center>IEEE Student Activities Committee, Hyderabad Section</center></h6>\
                    </div>\
                </div>\
                <div class="col-lg-2">\
                <a href="http://ieee.org/" target="_blank" class="logo"><img src="images/ieee.gif" height="35" style="right: 20px; float: right;" /></a>\
                </div>\
            </div>\
             </div>\
        </div>\
      <nav class="navbar navbar-expand-lg">\
        <div class="container">\
          <a href="index.html" class="navbar-brand home"><img src="images/sn logo.webp" class="d-md-inline-block" height="60"></a>\
        <div class="navbar-buttons">\
          <button type="button" data-toggle="collapse" data-target="#navigation" class="btn btn-outline-secondary navbar-toggler"><span class="sr-only">Toggle navigation</span><i class="fa fa-align-justify"></i></button>\
        </div>\
            <div id="navigation" class="collapse navbar-collapse">\
              <ul class="navbar-nav ">\
                  <li class="nav-item"><a href="index.html" class="nav-link" id="home">Home</a></li>\
                  <li class="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay="200" class="dropdown-toggle nav-link" id="about">About<b class="caret"></b></a>\
                    <ul class="dropdown-menu megamenu">\
                        <li>\
                          <div class="row">\
                              <div class="col-md-6 col-lg-3">\
                                <h5>SAC</h5>\
                                <ul class="list-unstyled mb-3">\
                                  <li class="nav-item"><a href="about_sac.html" class="nav-link" id="about_sac">About SAC</a></li>\
                                  <li class="nav-item"><a href="sac_team.html" class="nav-link" id="sac_execom">SAC ExeCom</a></li>\
                                  <li class="nav-item"><a href="sn_team.html" class="nav-link" id="sn_team">SN Team</a></li>\
                                  <li class="nav-item"><a href="sb_details.html" class="nav-link" id="sb_details">Student Branch Details</a></li>\
                                  <li class="nav-item"><a href="../sheets/Volunteers List by OU.xlsx" target="_blank" class="nav-link">Student Branch Details under OU</a></li>\
                                  <li class="nav-item"><a href="chapter_affinity.html" class="nav-link" id="chapters">Chapters and Affinity Groups</a></li>\
                                </ul>\
                              </div>\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>IEEE</h5>\
                                  <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="http://ieee.org/" class="nav-link">IEEE</a></li>\
                                    <li class="nav-item"><a href="https://sac.ieeer10.org/" class="nav-link">IEEE R10 SAC</a></li>\
                                    <li class="nav-item"><a href="https://students.ieee.org/" class="nav-link">IEEE Students</a></li>\
                                    <li class="nav-item"><a href="https://ieeehyd.org/" class="nav-link">IEEE Hyderabad</a></li>\
                                  </ul>\
                              </div>\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>more</h5>\
                                  <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="https://ieeexplore.ieee.org/Xplore/home.jsp" class="nav-link">IEEE Xplore Digital Library</a></li>\
                                    <li class="nav-item"><a href="https://ieee-collabratec.ieee.org/" class="nav-link">Collabratec</a></li>\
                                    <li class="nav-item"><a href="https://ieeextreme.org/" class="nav-link">IEEE Xtreme</a></li>\
                                    <li class="nav-item"><a href="https://www.ieeemadc.org/" class="nav-link">IEEE MADC</a></li>\
                                    <li class="nav-item"><a href="https://www.ieee.org/about/ethics/competition.html" class="nav-link">IEEE Student Ethics</a></li>\
                                    <li class="nav-item"><a href="https://standards.ieee.org/" class="nav-link">IEEE Standards</a></li>\
                                    <li class="nav-item"><a href="https://spectrum.ieee.org/" class="nav-link">IEEE Spectrum</a></li>\
                                  </ul>\
                              </div>\
                          </div>\
                        </li>\
                    </ul>\
                  </li>\
                  <li class="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay="200" class="dropdown-toggle nav-link" id="membership-benefits">Membership & Benefits<b class="caret"></b></a>\
                    <ul class="dropdown-menu megamenu">\
                      <li>\
                          <div class="row">\
                              <div class="col-md-6 col-lg-3">\
                                <h5>IEEE Students Membership & Benefits</h5>\
                                <ul class="list-unstyled mb-3">\
                                  <li class="nav-item"><a href="membership-benefits.html" class="nav-link" id="benefits">Student Membership Benefits</a></li>\
                                    <li class="nav-item"><a href="IEEE-Membership.pdf" target="_blank" class="nav-link" id="apply">How to apply for IEEE Students Membership</a></li>\
                                    <li class="nav-item"><a href="young_professionals.html" class="nav-link" id="yp">Young Professionals </a></li>\
                                </ul>\
                              </div>\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>Membership Benefits</h5>\
                                  <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="https://ieee-collabratec.ieee.org/" class="nav-link">Collabratec</a></li>\
                                    <li class="nav-item"><a href="https://students.ieee.org/benefits/" class="nav-link">IEEE Benefits</a></li>\
                                    <li class="nav-item"><a href="https://ieeextreme.org/" class="nav-link">IEEE Xtreme</a></li>\
                                    <li class="nav-item"><a href="https://ieeetv.ieee.org/" class="nav-link">IEEE.tv</a></li>\
                                    <li class="nav-item"><a href="https://www.ieee.org/membership/discounts/index.html" class="nav-link">IEEE Discounts</a></li>\
                                  </ul>\
                              </div>\
                              <div class="col-md-12 col-lg-6">\
                                  <div class="banner">\
                                    <a href="#"><img src="images/banner/future50.jpg" alt="" class="img img-fluid"></a>\
                                  </div>\
                              </div>\
                          </div>\
                        </li>\
                    </ul>\
                </li>\
                  <li class="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay="200" class="dropdown-toggle nav-link" id="opportunities">Opportunities<b class="caret"></b></a>\
                    <ul class="dropdown-menu megamenu">\
                        <li>\
                          <div class="row">\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>Student Opportunities</h5>\
                                <ul class="list-unstyled mb-3">\
                                      <li class="nav-item"><a href="sac_awards.html" class="nav-link" id="sac_awards">SAC Awards Programs</a></li>\
                                    <li class="nav-item"><a href="student-professional-awareness.html" class="nav-link" id="awareness">Professional Awareness</a></li>\
                                    <li class="nav-item"><a href="https://students.ieee.org/contests-for-students/" class="nav-link">Contests for Students</a></li>\
                                    <li class="nav-item"><a href="https://students.ieee.org/funding/" class="nav-link">Funding & Grands</a></li>\
                                    <li class="nav-item"><a href="humanitarian_activities.html" class="nav-link">IEEE Humanitarian Activities</a></li>\
                                    <li class="nav-item"><a href="https://ct.ieee.org/badges-1/" class="nav-link">Badging</a></li>\
                                  </ul>\
                              </div>\
                              <div class="col-md-12 col-lg-9">\
                                  <div class="banner">\
                                    <a href="#"><img src="images/banner/future50.gif" style="height:330px;" alt="" class="img img-fluid"></a>\
                                  </div>\
                              </div>\
                          </div>\
                      </li>\
                    </ul>\
                  </li>\
                  <li class="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay="200" class="dropdown-toggle nav-link" id="resources">Resources<b class="caret"></b></a>\
                    <ul class="dropdown-menu megamenu">\
                        <li>\
                          <div class="row">\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>Resources</h5>\
                                <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="gallery.html" class="nav-link" id="photos">Photos</a></li>\
                                    <li class="nav-item"><a href="reports.html" class="nav-link" id="reports">Event Reports</a></li>\
                                    <li class="nav-item"><a href="resources/student_branch_development_calendar.pdf" target="_blank" class="nav-link" id="ppt">Student Branch Development Calendar</a></li>\
                                    <li class="nav-item"><a href="https://students.ieee.org/about-virtual-speakers/" target="_blank" class="nav-link" id="ppt">Virtual Speakers</a></li>\
                                </ul>\
                              </div>\
                              <div class="col-md-6 col-lg-3">\
                                <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="https://supportcenter.ieee.org/app/answers/list" class="nav-link" id="photos">Support Center</a></li>\
                                    <li class="nav-item"><a href="resources/IEEE R10 Vtools.pptx" class="nav-link" id="photos">IEEE R10 VTools (PPTs)</a></li>\
                                    <li class="nav-item"><a href="IEEE Master email.html" class="nav-link" id="photos">Student Branch Leadership Newsletter (April 2021)</a></li>\
                                    <li class="nav-item"><a href="IEEE-Membership.pdf" target="_blank" class="nav-link" id="photos">How to be an IEEE Student Member</a></li>\
                                </ul>\
                              </div>\
                          </div>\
                      </li>\
                    </ul>\
                  </li>\
                  <li class="nav-item dropdown menu-large"><a href="#" data-toggle="dropdown" data-hover="dropdown" data-delay="200" class="dropdown-toggle nav-link" id="events">Events<b class="caret"></b></a>\
                    <ul class="dropdown-menu megamenu">\
                        <li>\
                          <div class="row">\
                              <div class="col-md-6 col-lg-3">\
                                  <h5>Events</h5>\
                                  <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="igen.html" class="nav-link" id="ssc">IGEN 2020</a></li>\
                                    <li class="nav-item"><a href="events.html" class="nav-link" id="event">Upcoming & Previous Events</a></li>\
                                </ul>\
                              </div>\
                              <div class="col-md-6 col-lg-3">\
                              <h5>Congress</h5>\
                                <ul class="list-unstyled mb-3">\
                                    <li class="nav-item"><a href="adithyam.html" class="nav-link" id="ssc">Adithyam 2021</a></li>\
                                    <li class="nav-item"><a href="parjanya.html" class="nav-link" id="parjanya">Parjanya 2021</a></li>\
                                    <li class="nav-item"><a href="ssc.html" class="nav-link" id="ssc">SSC 2020</a></li>\
                                </ul>\
                              </div>\
                              <div class="col-md-12 col-lg-6">\
                                  <div class="banner">\
                                    <a href="https://syp.computer.org/gsc"><img src="images/banner/gsc.jpg" style="height:200px;" alt="" class="img img-fluid"></a>\
                                  </div>\
                              </div>\
                          </div>\
                      </li>\
                    </ul>\
                  </li>\
                <li class="nav-item"><a href="contact_us.html" class="nav-link" id="contact">Contact&nbsp;Us</a></li>\
                 <li class="nav-item"><a href="parjanya.html" class="nav-link" id="parjanya">Parjanya&nbsp;2021</a></li>\
              </ul>\
            </div>\
        </div>\
    </nav>\
<marquee width = "100%" onmouseover="this.stop();" onmouseout="this.start();" style="background:white;">NAARI (Women Conding Competition) Contest Rankings are out. <a href="http://www.codechef.com/rankings/NWCC2021">View Here</a></marquee>\
</header>';
