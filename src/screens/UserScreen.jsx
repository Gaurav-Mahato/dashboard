import React,{useEffect, useState} from "react"
import { useSelector, useDispatch } from "react-redux"
import {logout} from "../actions/authActions"
import {Button, NavDropdown, Navbar, Container, Nav, Row, Col} from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BarGraph } from "../components/BarGraph"
import LineGraph from "../components/LineGraph"
import { arrayMaker, meanMaker, minMaxDiffMaker, valueMaker, weightedMeanMaker } from "../utils/dataGenerator"
import BarChart from "../components/BarChart"


const UserScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector(state => state.userLogin)
    const [zoneData, setZoneData] = useState([])
    const [branchData, setBranchData] = useState([])
    const [plantData, setPlantData] = useState([])
    const [dummyData, setDummyData] = useState(() => {
        axios.get('http://localhost:8080/data/dummy').then(res => setDummyData(res.data))
    })
    const zoneHandler = (e) => {
        const zone_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/zone',{zone_name},config).then(res => setZoneData(res.data)).catch(err => console.error(err))
        setBranchData([])
        setPlantData([])
    }
    const branchHandler = (e) => {
        e.preventDefault()
        const branch_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/branch',{branch_name},config).then(res => setBranchData(res.data))
        setZoneData([])
        setPlantData([])
    }
    const plantHandler = (e) => {
        e.preventDefault()
        const plant_name = e.target.innerText
        const config = {
            headers: {
                'Content-Type': "application/json",
                authorization: user.token
            }
        }
        axios.post('http://localhost:8080/data/plant',{plant_name},config).then(res => setPlantData(res.data))
        setZoneData([])
        setBranchData([])
    }
    const [location, setLocation] = useState(() => {
        if(user){
            const config = {
                headers:{
                    'Content-Type': "application/json",
                    Authorization: `${user.token}`
                }
            }
            axios.get("http://localhost:8080/data",config).then(res => setLocation(res.data))
        }
    })
    const logoutHandler = (e) => {
        e.preventDefault()
        dispatch(logout())
    }
    
    useEffect(() => {
        if(!user){
            navigate("/user-login")
        }else{
            setLocation(() => {const config = {
                headers:{
                    'Content-Type': "application/json",
                    Authorization: `${user.token}`
                }
            }
            axios.get("http://localhost:8080/data",config).then(res => setLocation(res.data))})
        }
    },[navigate,user])
    return(
        <>
            {/* <Button onClick={logoutHandler}>Log Out</Button>  */}
            <header style={{color: 'white'}}>
                <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
                    <Container>
                        <Navbar.Brand>Prism Johnson Limited</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav style={{marginLeft: 'auto'}}>
                                {location && location.zone !== 'NOT PERMITTED' ? (
                                    <NavDropdown title="Zone" id='zone'>
                                        {location.zone.map(zone => <NavDropdown.Item key="zone.zone_id" onClick={zoneHandler}>{zone.name}</NavDropdown.Item>)}
                                    </NavDropdown>
                                ) : null}
                                {location && location.branch !== 'NOT PERMITTED' ? (
                                    <NavDropdown title="Branch" id='branch'>
                                        {location.branch.map(branch => <NavDropdown.Item key="branch.id" onClick={branchHandler}>{branch.name}</NavDropdown.Item>)}
                                    </NavDropdown>
                                ) : null}
                                {location && location.plant !== 'NOT PERMITTED' ? (
                                    <NavDropdown title="Plant" id='plant'>
                                        {location.plant.map(plant => <NavDropdown.Item key="plant.plant_id" onClick={plantHandler}>{plant.name}</NavDropdown.Item>)}
                                    </NavDropdown>
                                ) : null}
                                <NavDropdown title={user ? user.name : 'User'} id="user">
                                    <NavDropdown.Item onClick={logoutHandler}>
                                        Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <Container style={{marginTop: '100px'}}>

                {/* Zone related graphs */}
                <Row>
                    {zoneData && zoneData.length !== 0 ? <>
                        <Col md={6}>
                           <BarGraph name={`Material-Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Material Number" quantity="Billed Quantity" colour="red" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                            <LineGraph name={`Material-Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Material Number" />
                        </Col>
                        <Col md={6}>
                            <BarGraph name={`Customer Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Customer group" quantity="Billed Quantity" colour="red" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                            <LineGraph name={`Customer-Group Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction="Customer group" />
                        </Col>
                        <Col md={6}>
                            {dummyData && <div style={{"marginBottom": "40px"}}>
                            <h3>ASP trends of Micro Market</h3>
                            <BarChart chartData={{
                                labels: arrayMaker(dummyData,'MICRO MARKET'),
                                datasets: [
                                    {
                                        label: '',
                                        data : valueMaker(dummyData,'MICRO MARKET','MIN'),
                                        backgroundColor: 'rgba(0, 0, 0, 0.01)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'Difference',
                                        data : minMaxDiffMaker(dummyData),
                                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'ASP',
                                        data: weightedMeanMaker(dummyData,'MICRO MARKET','asp'),
                                        backgroundColor: 'green',
                                        type: 'line',
                                        borderColor: 'green',
                                        tension: 0.2
                                    },
                                ]
                              }} />
                            </div>}
                        </Col>
                        <Col>
                            <BarGraph name={`Branch-Wise Data of ${zoneData[0].Zone}`} data={zoneData} distinction = 'Region' quantity='Billed Quantity' colour="red" handler={valueMaker} />
                        </Col>
                    </> : null}
                </Row>
                {/* End */}

                {/* Branch related graphs */}
                <Row>
                    {branchData && branchData.length !== 0 ? <>
                        <Col md={6}>
                            <BarGraph name={`Material-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Material Number" quantity="Billed Quantity" colour="blue" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                            <LineGraph name={`Material-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Material Number" />
                        </Col>
                        <Col md={6}>
                            <BarGraph name={`Plant-Wise Data of ${branchData[0].Region}`} data={branchData} distinction="Plant" quantity="Billed Quantity" colour="blue" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                            <LineGraph name={`Plant-Wise asp pam mom Data of ${branchData[0].Region}`} data={branchData} distinction="Plant" />
                        </Col>
                        <Col md={6}>
                            <BarGraph name={`Customer group wise Data of ${branchData[0].Region}`} data={branchData} distinction="Customer group" quantity="Billed Quantity" colour="blue" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                            <LineGraph name={`Customer group MOM PAM asp analysis of ${branchData[0].Region}`} data={branchData} distinction="Customer group" />
                        </Col>
                        <Col md={6}>
                            <div style={{"marginBottom": "40px"}}>
                            <h3>Web Price and asp comparison</h3>
                            <BarChart chartData={{
                                labels: arrayMaker(branchData,'Plant'),
                                datasets: [
                                    {
                                        label: 'asp',
                                        data : weightedMeanMaker(branchData,'Plant','asp'),
                                        backgroundColor: 'blue',
                                        type: 'bar'
                                    },
                                    {
                                        label: 'Web Price',
                                        data: meanMaker(branchData,'Plant','Web_Price'),
                                        backgroundColor: 'green',
                                        type: 'line',
                                        borderColor: 'green'
                                    }
                                ]
                              }} />
                            </div> 
                        </Col>
                        <Col md={6}>
                            {dummyData && <div style={{"marginBottom": "40px"}}>
                            <h3>ASP trends of Micro Market</h3>
                            <BarChart chartData={{
                                labels: arrayMaker(dummyData,'MICRO MARKET'),
                                datasets: [
                                    {
                                        label: '',
                                        data : valueMaker(dummyData,'MICRO MARKET','MIN'),
                                        backgroundColor: 'rgba(0, 0, 0, 0.01)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'Difference',
                                        data : minMaxDiffMaker(dummyData),
                                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'ASP',
                                        data: weightedMeanMaker(dummyData,'MICRO MARKET','asp'),
                                        backgroundColor: 'green',
                                        type: 'line',
                                        borderColor: 'green',
                                        tension: 0.2
                                    },
                                ]
                              }} />
                            </div>}
                        </Col>
                    </> : null}
                </Row>
                {/* End */}

                {/* Plant related graphs */}
                <Row>
                    {plantData && plantData.length !== 0 ? <>
                        <Col md={6}>
                           <BarGraph name={`Material-Wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Material Number" quantity="Billed Quantity" colour="green" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                           <LineGraph name={`Material-Wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Material Number" />
                        </Col>
                        <Col md={6}>
                           <BarGraph name={`Customer group wise Data of ${plantData[0].Plant}`} data={plantData} distinction="Customer group" quantity="Billed Quantity" colour="green" handler={valueMaker} />
                        </Col>
                        <Col md={6}>
                           <LineGraph name={`Customer group MOM PAM asp analysis of ${plantData[0].Plant}`} data={plantData} distinction="Customer group" />
                        </Col>
                        <Col md={6}>
                            {dummyData && <div style={{"marginBottom": "40px"}}>
                            <h3>ASP trends of Micro Market</h3>
                            <BarChart chartData={{
                                labels: arrayMaker(dummyData,'MICRO MARKET'),
                                datasets: [
                                    {
                                        label: '',
                                        data : valueMaker(dummyData,'MICRO MARKET','MIN'),
                                        backgroundColor: 'rgba(0, 0, 0, 0.01)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'Difference',
                                        data : minMaxDiffMaker(dummyData),
                                        backgroundColor: 'rgba(255, 205, 86, 0.5)',
                                        type: 'bar',
                                        stack: 'combined'
                                    },
                                    {
                                        label: 'ASP',
                                        data: weightedMeanMaker(dummyData,'MICRO MARKET','asp'),
                                        backgroundColor: 'green',
                                        type: 'line',
                                        borderColor: 'green',
                                        tension: 0.2
                                    },
                                ]
                              }} />
                            </div>}
                        </Col>
                    </> : null}
                </Row>
                {/* End */}

            </Container>
        </>
    )
}

export default UserScreen