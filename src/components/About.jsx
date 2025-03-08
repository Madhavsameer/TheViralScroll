import React from "react";
import { Container, Row, Col } from "reactstrap";
import CountUp from "react-countup";
import Slider from "react-slick";
import "../styles/About.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import banner1 from "../assets/banner.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

const About = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1200,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <section id="about-blog">
      <Container>
        <Row>
          <Col lg="6">
            <div className="about__content">
              <h2>About Our Blog</h2>
              <p>
                Welcome to The Viral Scroll, your go-to destination for insightful articles,
                latest trends, and expert opinions on a variety of topics. Our mission
                is to inspire, educate, and connect readers through engaging content.
                From technology to lifestyle, we bring you well-researched and compelling
                stories from industry experts and passionate writers.
              </p>

              <div className="about__counter">
                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={500} duration={5} suffix="+" />
                  </span>
                  <p className="counter__title">50+ Blog Posts</p>
                </div>

                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={50} duration={5} suffix="+" />
                  </span>
                  <p className="counter__title">5+ Expert Writers</p>
                </div>

                <div className="single__counter">
                  <span className="counter">
                    <CountUp start={0} end={10000} duration={5} suffix="+" />
                  </span>
                  <p className="counter__title">10,000+ Active Readers</p>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6" className="mb-4 mb-lg-0">
            <div className="about__img">
              <Slider {...settings}>
                <div>
                  <img src={banner1} alt="Blogging Insights" className="w-100" />
                </div>
                <div>
                  <img src={banner2} alt="Creative Writing" className="w-100" />
                </div>
                <div>
                  <img src={banner3} alt="Tech Trends" className="w-100" />
                </div>
              </Slider>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default About;
