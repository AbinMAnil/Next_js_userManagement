import Link from "next/link";

const notFoundPage = () => {

     return <figure>
          <div className="sad-mac"></div>
          <figcaption>
               <span className="sr-text">Error 404: Not Found</span>
               <span className="e"></span>
               <span className="r"></span>
               <span className="r"></span>
               <span className="o"></span>
               <span className="r"></span>
               <span className="_4"></span>
               <span className="_0"></span>
               <span className="_4"></span>
               <span className="n"></span>
               <span className="o"></span>
               <span className="t"></span>
               <span className="f"></span>
               <span className="o"></span>
               <span className="u"></span>
               <span className="n"></span>
               <span className="d"></span>
          </figcaption>
          <Link href="/" ><button className="m-1" >back to home</button></Link>
     </figure>
}

export default notFoundPage;