import { useParams } from "react-router-dom"
import "./invoice.css"
import { useOrderDetailsQuery } from "../../redux/api/orderApi"
import { useEffect } from "react"
import toast from "react-hot-toast"
import Loader from "../layout/Loader"
import html2canvas from "html2canvas"
import {jsPDF} from "jspdf"
const Invoice = () => {
    const params = useParams()
    const {data, isLoading, error} = useOrderDetailsQuery(params?.id)
    const order = data?.order || {}
    const{shippingInfo, paymentInfo, orderItems, user, totalAmount, orderStatus} = order
    useEffect(()=>{
        if (error) {
            toast.error(error?.data?.message)
        }
    },[error])
    const handleDownload = () =>{
        const input = document.getElementById("order_invoice")
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL("image/png")
            const pdf = new jsPDF()
            const pdWith = pdf.internal.pageSize.getWidth();
            pdf.addImage(imgData, "PNG", 0, 0, pdWith, 0)
            pdf.save(`invoice_${order?._id}.pdf`)
        })
    }
    if(isLoading) return <Loader/>
  return (
    <div className="order-invoice my-5">
    <div className="row d-flex justify-content-center mb-5">
      <button className="btn btn-success col-md-5" onClick={handleDownload}>
        <i className="fa fa-print"></i> Download Invoice
      </button>
    </div>
    <div id="order_invoice" className="p-3 border border-secondary">
      <header className="clearfix">
        <div id="logo">
          <img src="../images/invoice-logo.png" alt="Company Logo" />
        </div>
        <h1>INVOICE # {order._id}</h1>
        <div id="company" className="clearfix">
          <div>ShopIT</div>
          <div>
            455 Foggy Heights,
            <br />
            AZ 85004, US
          </div>
          <div>(602) 519-0450</div>
          <div>
            <a href="mailto:info@shopit.com">info@shopit.com</a>
          </div>
        </div>
        <div id="project">
          <div><span>Name</span> {user?.name}</div>
          <div><span>EMAIL</span> {user?.email}</div>
          <div><span>PHONE</span> {shippingInfo?.phoneNo}</div>
          <div>
            <span>ADDRESS</span> {shippingInfo?.address}, {shippingInfo?.city},{" "}
            {shippingInfo?.zipCode}, {shippingInfo?.country}
          </div>
          <div><span>DATE</span>{new Date(order?.createdAt).toLocaleString('en-US')}</div>
          <div><span>Status</span> {paymentInfo?.status}</div>
        </div>
      </header>
      <main>
        <table className="mt-5">
          <thead>
            <tr>
              <th className="service">ID</th>
              <th className="desc">NAME</th>
              <th>PRICE</th>
              <th>QTY</th>
              <th>TOTAL</th>
            </tr>
          </thead>
          <tbody>
            {
                orderItems?.map((items, i)=>(
                    <tr key={i}>
                    <td className="service">{items?.product}</td>
                    <td className="desc">{items?.name}</td>
                    <td className="unit">${items?.price}</td>
                    <td className="qty">{items?.quantity}</td>
                    <td className="total">${items?.price * items?.quantity}</td>
                  </tr>
                ))
            }
           

            <tr>
              <td colSpan="4">
                <b>SUBTOTAL</b>
              </td>
              <td className="total">$2299.95</td>
            </tr>

            <tr>
              <td colSpan="4">
                <b>TAX 15%</b>
              </td>
              <td className="total">$344.99</td>
            </tr>

            <tr>
              <td colSpan="4">
                <b>SHIPPING</b>
              </td>
              <td className="total">$10.00</td>
            </tr>

            <tr>
              <td colSpan="4" className="grand total">
                <b>GRAND TOTAL</b>
              </td>
              <td className="grand total">$2654.94</td>
            </tr>
          </tbody>
        </table>
        <div id="notices">
          <div>NOTICE:</div>
          <div className="notice">
            A finance charge of 1.5% will be made on unpaid balances after 30
            days.
          </div>
        </div>
      </main>
      <footer>
        Invoice was created on a computer and is valid without the signature.
      </footer>
    </div>
  </div>
  )
}

export default Invoice