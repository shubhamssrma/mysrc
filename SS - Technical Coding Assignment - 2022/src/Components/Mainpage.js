import React, { Component } from 'react'
import './style.css'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import CategoryIcon from '../Images/category.png'
import axios from 'axios'
import { Spinner } from 'react-bootstrap';
export default class Mainpage extends Component {
  constructor() {
    super()
    this.state = {
      fetchdataurl: `https://s3.amazonaws.com/open-to-cors/assignment.json`,
      isApiHitComplete: false, isDataFound: false,
      products: [], totalproducts: 0
    }
    this.fetchProducts = this.fetchProducts.bind(this)
  }

  fetchProducts() {
    this.setState({ isApiHitComplete: false, isDataFound: false })
    axios.get(this.state.fetchdataurl).then(resp => {
      console.log(resp.data)
      if (resp.data.count != undefined) {
        this.setState({ totalproducts: resp.data.count })
      }
      if (resp.data.products != undefined && Object.keys(resp.data.products).length > 0) {
        let arr = []
        for (const key in resp.data.products) {
          let obj = resp.data.products[key]
          obj['productno'] = key
          arr.push(obj)
        }
        console.log(arr)
        this.setState({ products: arr, isDataFound: true })
      } else {
        this.setState({ isDataFound: false })
      }
    })
      .then(() => this.setState({ isApiHitComplete: true }))
      .catch(err => console.error(err))
  }

  componentDidMount() {
    this.fetchProducts()
  }

  render() {
    return (
      <div className='main_outerdiv'>
        {
          this.state.isApiHitComplete ?
            this.state.isDataFound ?
              <div className="product_maindiv">
                <div className="header">
                  <span>All Products</span>
                  <span>Count : {this.state.totalproducts}</span>
                </div>
                <div className="all_products">
                  {
                    this.state.products.map((product, index) => {
                      return (
                        <div className="product" key={product.productno} style={{borderTop:index != 0 ? '1px solid rgba(0,0,0,0.1)' : '0px'}}>
                          <div className="title">
                            <div className="imageBox">
                              <img src={CategoryIcon} alt="" />
                            </div>
                            <div className="rightBox">
                              <span>{product.title}</span>
                              <span>@{product.subcategory}</span>
                              <div className="price">
                                <p>Price : &#8377; {product.price}</p>
                              </div>
                            </div>
                            <div className='popularity'>
                              <span>{product.popularity}</span>
                              <ThumbUpIcon style={{ paddingLeft: "5px" }}/>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              </div>
              :
              <div className="norecords">
                <h5 style={{color:'orange'}}>No Record</h5>
              </div>
            :
            <div className="loader">
              <Spinner animation="border" variant="info" />
            </div>
        }
      </div>
    )
  }
}
