import { useState,useEffect } from "react";
import {Form,Card,Button} from "react-bootstrap"
import styles from "./userStyle.module.css";
import { API_BASE_URL } from "../../config";
import { apiRequest } from "../../services/api";


function UserCreation() {

  //Input field's initial value
  const initialUser ={
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    mobile:"",
    addressLine1: "",
    addressLine2: "",
    addressLine3: "",
    district: "",
    state: "",
    country: "India",
    pincode: "",
    password:""
  };


  const [user,setUser]=useState(initialUser);
  const [stateValues, setStateValues] = useState([]);
  const [stateId, setStateId] = useState("");
  const [districtValues, setDistrictValues] = useState([]);

  const [error,setError] = useState({});
  let payload={};

const fetchStates = async () => 
{
  try{
      const endpoint = `/reference/states`;
      const response = await apiRequest(endpoint);
      // const token = localStorage.getItem("accessToken");
      // const response = await fetch(`${API_BASE_URL}/reference/states`,{
      //   headers: { Authorization: `Bearer ${token}` },
      // },);
      const data = await response.json();
      setStateValues(data);     
  }
  catch(exception){
    console.log(exception);
  }
};

const fetchDistrict = async () => 
{
  try{
      const endpoint = `/reference/districts/${stateId}`;
      const response = await apiRequest(endpoint);
      // const token = localStorage.getItem("accessToken");
      // const response = await fetch(`${API_BASE_URL}/reference/districts/${stateId}`,{
      //   headers: { Authorization: `Bearer ${token}` },
      // },);
      const data = await response.json();
      setDistrictValues(data);      
  }
  catch(exception){
    console.log(exception);
  }
};

const postUser = async() => {
  try{
      const endpoint = `/users`;
      const response = await apiRequest(endpoint,"POST",payload);
      // const token = localStorage.getItem("accessToken");
      // const response = await fetch(`${API_BASE_URL}/users`,{
      //   method:"POST",
      //   headers: {
      //      "Content-Type": "application/json",
      //      Authorization: `Bearer ${token}` 
      //     },
      //   body:JSON.stringify(payload)
      // },);
      const data = await response.json();
      if(response.status === 200 || response.status === 201){
         setUser(initialUser);
         setStateValues([]);
         setDistrictValues([]);
      }
  }
  catch(exception){
    console.log(exception);
  }

};

  useEffect(() => {
    fetchStates()
  },[]);

  useEffect(()=>{
      if (!user.state) return;
      fetchDistrict()
  },[user.state]);

  const vaildateInputs = (name,value) => {
     let error = "";
      if(name==="firstName" && (!value.trim())){
          error = "Firstname is required";
      }
      else if(name==="lastName" && (!value.trim())){
          error = "Last name is required";
      }
      return error;
  };

   const handleChange = (e) => {
    const { name, value, options, selectedIndex } = e.target;
      setUser((prev) => ({
      ...prev,
      [name]: value,
    }));

    const error = vaildateInputs(name,value);
    setError((errors)=> ({
      ...errors,
      [name] : error
    }));

    if (name === 'state' && value !== "") {
      const selectedOption = options[selectedIndex];
      const selectedStateId = selectedOption.dataset.stateid;
      setStateId(selectedStateId);
    }
  };

  const handleSubmit=(e) => {
  e.preventDefault();
    const{
      addressLine1,
      addressLine2,
      addressLine3,
      district,
      state,
      country,
      pincode,
      ... rest
    } = user;

    const fullAddress = [
      addressLine1,
      addressLine2,
      addressLine3,
      district,
      state,
      country,
      pincode
    ]
      .filter(Boolean)
      .join(", ");

     payload ={
      ...rest,
      address : fullAddress,
      name : user.firstName + user.lastName
    }
    postUser();
  }


  return(
    <div className={styles.containerdiv}>
      <Form className={styles.containerdiv} onSubmit={handleSubmit}>
        <h3 style={{ marginBottom: "30px" }}>User Details</h3>
        <div className={styles.formLayout}>
            <div>
            <Form.Group className="mb-3">
              <Form.Label>First name</Form.Label>
              <Form.Control
              type="text"
              name="firstName"
              value={user.firstName}
              onChange={handleChange}
              isInvalid = {!!error.firstName}
              >           
              </Form.Control>
              <Form.Control.Feedback type='invalid'>{error.firstName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last name</Form.Label>
              <Form.Control
              type="text"
              name="lastName"
              value={user.lastName}
              onChange={handleChange}
              isInvalid={!!error.lastName}
              />
                            <Form.Control.Feedback type='invalid'>{error.lastName}</Form.Control.Feedback>

            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>User name</Form.Label>
              <Form.Control
              type="text"
              name="username"
              value={user.username}
              onChange={handleChange}
              autoComplete="off"
              />
            </Form.Group>

             <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
              type="password"
              autoComplete="new-password"
              name="password"
              value={user.password}
              onChange={handleChange}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>E-mail id</Form.Label>
              <Form.Control
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Phone number</Form.Label>
              <Form.Control
              type="number"
              name="mobile"
              value={user.mobile}
              onChange={handleChange}
              />
            </Form.Group>

            </div>

            <div>
              <Form.Group className="mb-3">
                  <Form.Label>Flat, House no., Building, Company, Apartment</Form.Label>
                  <Form.Control
                    name="addressLine1"
                    value={user.addressLine1}
                    onChange={handleChange}
                  />
              </Form.Group>

              <Form.Group className="mb-3">
                  <Form.Label>Area, Street, Sector, Village</Form.Label>
                  <Form.Control
                    name="addressLine2"
                    value={user.addressLine2}
                    onChange={handleChange}
                  />
              </Form.Group>              

              <Form.Group className="mb-3">
                  <Form.Label>Landmark</Form.Label>
                  <Form.Control
                    name="addressLine3"
                    value={user.addressLine3}
                    onChange={handleChange}
                  />
              </Form.Group>

              <div className={styles.secondformLayout}>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Select
                    name="state"                    
                    onChange={handleChange}
                  >
                    <option value="">Select state</option>
                    {
                      stateValues?.map((state) => (
                        <option key={state.id} value={state.stateName} data-stateid={state.id}>{state.stateName}</option>
                      ))
                    }                                        
                  </Form.Select>
                </Form.Group>  

                <Form.Group className="mb-3">
                  <Form.Label>Town/City</Form.Label>
                  <Form.Select
                    name="district"
                    onChange={handleChange}
                  >
                    <option value="">Select city</option>
                    {
                      districtValues.map((district) => (
                        <option key={district.id} value={district.districtName}>{district.districtName}</option>
                      ))
                    }                    
                  </Form.Select>
                </Form.Group>             
            </div>

              <div className={styles.secondformLayout}>             

                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    name="pincode"
                    value={user.pincode}
                    onChange={handleChange}
                  />
                </Form.Group>

                 <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    name="country"
                    value={user.country}
                    disabled
                  />
                </Form.Group>
              </div>          

          </div>
        </div>
       
      <div style={{display:'flex', alignItems:'center', justifyContent:'center',textAlign:'center'}}>
        <button type="submit" className={`btn btn-primary ${styles.submitbtn}`}>Submit</button>
      </div>
      </Form>
    </div>
 );
}

export default UserCreation;
