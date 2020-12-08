import React, { useState } from "react";
import './App.css';
import {
    Button,
    Form,
    Col,
    Row,
    Container,
  } from "react-bootstrap";
import {useForm} from "react-hook-form";
import axios from 'axios';
import SyncLoader from "react-spinners/SyncLoader";

const state_of_issue_list = ["NSW", "QLD", "SA", "TAS", "VIC", "WA", "ACT", "NT"]

export default function RegisterClinic() {

    const [result, setResult] = useState('');
    const [loading, setLoading] = useState(false);
    const {register, handleSubmit} = useForm();

    const onSubmit = async (data) => {
        setLoading(true);
        console.log(data);
        axios.post('https://street-brand-backend.herokuapp.com/kyc', data)
        .then(function (response) {
          const stringedResponse = JSON.stringify(response.data);
          setResult(stringedResponse)
          setLoading(false);
        })
        .catch(function (error) {
            console.log(error);
            setResult('Something went wrong');
            setLoading(false);
        });
    }

    return (
    <Container className="mt-5 rounded">
      <Row sm={1} md={2} lg={2}>
        <Col className="rounded p-5 ">
          <h2>Know Your Customer</h2>
          <p>Fill out the form to get to know your customer better. Know Your Customer (KYC) checks to identify new customers.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </Col>
        <Col className="p-5 rounded">
          <Form onSubmit={handleSubmit(onSubmit)}>
              <Form.Group >
                  <Form.Label>BirthDate* </Form.Label>
                  <Form.Control required placeholder="YYYY-MM-DD" name="birthDate" ref={register ({required:true})}/>
              </Form.Group>
              <Form.Group >
                  <Form.Label>Given Name* </Form.Label>
                  <Form.Control required placeholder="John" name="givenName" ref={register ({required:true})}/>
              </Form.Group>
              <Form.Group >
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control  placeholder="Eric" name="middleName" ref={register()}/>
              </Form.Group>
              <Form.Group >
                  <Form.Label>Family Name*</Form.Label>
                  <Form.Control required placeholder="Doe" name="familyName" ref={register ({required:true})}/>
              </Form.Group>
              <Form.Group >
                  <Form.Label>License Number*</Form.Label>
                  <Form.Control required placeholder="Drivers license number" name="licenceNumber" ref={register ({required:true})}/>
              </Form.Group>

              <Form.Group controlId="stateOfIssue">
              <Form.Label>State Of Issue*</Form.Label>
                  <Form.Control as="select" name="stateOfIssue" ref={register ({required:true})} custom>
                  <option disabled >- Please Select -</option>
                  {state_of_issue_list.map(state => (
                    <option key={state} >{state}</option>
                  ))}
                  </Form.Control>
              </Form.Group>

              <Form.Group >
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control  placeholder="YYYY-MM-DD" name="expiryDate" ref={register ()}/>
              </Form.Group>

              <Button variant="primary" type="submit">
                  Submit
              </Button>
              <Row>
              <h5 className='mt-5'>Result:</h5>
              { !loading &&
                <h5 className='mt-5 mx-2'> {result}</h5>
              }
              </Row>
              <div className='mt-5'>
                <SyncLoader
                  size={15}
                  margin={2}
                  color={"#123abc"}
                  loading={loading}
                />
              </div>
          </Form>
        </Col>
      </Row>
    
    </Container>
    )
}