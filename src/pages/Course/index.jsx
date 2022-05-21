import React, { useEffect } from "react"
import { Container, Row } from "reactstrap"
import MetaTags from "react-meta-tags"

//import component
import PopularPost from "./PopularPost"

//Import Breadcrumb
import Breadcrumbs from "../../components/Common/Breadcrumb"
import { useDispatch } from "react-redux"
import { changeStatusCourseAction, getCourseAction } from "store/course/actions"

const Course = props => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCourseAction())
  }, [dispatch])

  // useEffect(() => {
  // }, [dispatch])
  return (
    <React.Fragment>
      <div className="page-content">
        <MetaTags>
          <title>CloudMate</title>
        </MetaTags>
        <Container fluid>
          {/* Render Breadcrumb */}
          <Breadcrumbs title="Dashboards" breadcrumbItem="Course" />
          {/* <Row>
            <CardUser options={options} series={series} />
            <Settings />
          </Row>
          <Row>
            <Posts />
            <Comments />
            <TapVisitors />
          </Row> */}
          {/* <Row> */} {/* <Activity /> */}
          <PopularPost />
          {/* </Row> */}
        </Container>
      </div>
    </React.Fragment>
  )
}

export default Course
