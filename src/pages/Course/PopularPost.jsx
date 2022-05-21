import React from "react"
import { Link } from "react-router-dom"
import {
  Card,
  CardBody,
  Col,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
} from "reactstrap"

import ImageRender from "components/ImageRender"
// import images
import img1 from "../../assets/images/small/img-2.jpg"
import img2 from "../../assets/images/small/img-6.jpg"
import img3 from "../../assets/images/small/img-1.jpg"
import { useDispatch, useSelector } from "react-redux"
import { getImageOnServer } from "helpers/fakebackend_helper"
import { changeStatusCourseAction } from "store/course/actions"

const STATUS_CLASS = {
  null: "Khóa",
  [-1]: "Khóa",
  [0]: "Chờ xác nhận",
  [1]: "Đang hoạt động",
}
const PopularPost = () => {
  const dispatch = useDispatch()

  const courses = useSelector(state => state.Course.courses)
  console.log(
    `LHA:  ===> file: PopularPost.jsx ===> line 30 ===> courses`,
    courses
  )

  return (
    <React.Fragment>
      <Col xl={12}>
        <Card>
          <CardBody>
            <div className="d-flex">
              <div className="me-2">
                <h5 className="card-title mb-4">Danh sách khóa học</h5>
              </div>
              <UncontrolledDropdown className="ms-auto">
                <DropdownToggle
                  className="text-muted font-size-14"
                  color="white"
                >
                  <i className="mdi mdi-dots-horizontal"></i>
                </DropdownToggle>
                <DropdownMenu className="dropdown-menu-end">
                  <Link className="dropdown-item" to="#">
                    Action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Another action
                  </Link>
                  <Link className="dropdown-item" to="#">
                    Something else
                  </Link>
                  <div className="dropdown-divider"></div>
                  <Link className="dropdown-item" to="#">
                    Separated link
                  </Link>
                </DropdownMenu>
              </UncontrolledDropdown>
            </div>

            <div className="table-responsive">
              <table className="table align-middle table-nowrap mb-0">
                <thead>
                  <tr>
                    <th scope="col" colSpan="2">
                      Khóa học
                    </th>
                    <th scope="col">Giới thiệu</th>
                    <th scope="col">Mô tả</th>
                    <th scope="col">Trạng thái</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {courses.map((course, key) => (
                    <tr key={key}>
                      <td style={{ width: "100px" }}>
                        <ImageRender
                          image={course?.image}
                          className="avatar-md h-auto d-block rounded"
                        />
                        {/* <img
                          src={await getImageOnServer()}
                          alt=""
                          className=""
                        /> */}
                      </td>
                      <td>
                        <h5 className="font-size-13 text-truncate mb-1">
                          <Link to="#" className="text-dark">
                            {course?.name}
                          </Link>
                        </h5>
                        <p className="text-muted mb-0">{course?.updatedAt}</p>
                      </td>
                      <td>
                        <i className="bx bx-like align-middle me-1"></i>{" "}
                        {course?.intro}
                      </td>
                      <td>
                        <i className="bx bx-comment-dots align-middle me-1"></i>{" "}
                        {course?.topic}
                      </td>
                      <td
                        onClick={() => {
                          dispatch(
                            changeStatusCourseAction({
                              id: course._id,
                              status: [0, -1].includes(course.status) ? 1 : -1,
                            })
                          )
                        }}
                      >
                        <span
                          className={`${
                            course.status === 1 ? "btn-primary" : "bg-light"
                          } px-3 py-1 rounded`}
                          style={{
                            cursor: "pointer",
                          }}
                        >
                          {STATUS_CLASS[course?.status]}
                        </span>
                      </td>
                      <td>
                        <UncontrolledDropdown className="dropdown">
                          <DropdownToggle
                            className="text-muted font-size-16"
                            color="white"
                          >
                            <i className="mdi mdi-dots-horizontal"></i>
                          </DropdownToggle>
                          <DropdownMenu className="dropdown-menu-end">
                            <Link className="dropdown-item" to="#">
                              Action
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Another action
                            </Link>
                            <Link className="dropdown-item" to="#">
                              Something else
                            </Link>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item" to="#">
                              Separated link
                            </Link>
                          </DropdownMenu>
                        </UncontrolledDropdown>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardBody>
        </Card>
      </Col>
    </React.Fragment>
  )
}

export default PopularPost
