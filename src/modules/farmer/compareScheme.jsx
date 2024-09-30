import React from 'react';
import PageTitle from '../../components/dashboardComponents/PageTitle';
import profileImg1 from '../../images/CommercialCredit.png';
import profileImg2 from '../../images/sdb.PNG';
import profileImg3 from '../../images/boc.png';
import profileImg4 from '../../images/lolc.png';

function compareScheme() {
  return (
    <main id="main" className="main">
    <PageTitle page="Loan Comprison"/>
        <form>
            <div class="row">
                <div class="col-lg-12" > 
                    <div class="card border border-primary">
                        <div class="card-header bg-white py-3">
                            <p class="text-uppercase small mb-2"><strong>Compare</strong></p>                           
                        </div>
                            <div class="card-body">
                            <div class="row">
                            <div class="col-md-3">
                                <img    
                                src={profileImg1} 
                                class="img-fluid"
                                alt=""
                                />
                            </div>{}
                            <div class="col-md-3">
                                <img    
                                src={profileImg2} 
                                class="img-fluid"
                                alt=""
                                />
                            </div> 
                            <div class="col-md-3">
                                <img    
                                src={profileImg3} 
                                class="img-fluid"
                                alt=""
                                />
                            </div> 
                            <div class="col-md-3">
                                <img    
                                src={profileImg4} 
                                class="img-fluid"
                                alt=""
                                />
                            </div>
                            </div>

                            </div>
                             
                    </div>
                </div>        
            </div>
            
            <div class="row">                   
                <div class="col-md-4">
                    <div class="card">
                    <div class="mx-2 card-body">
                        <h5 class="card-title my-2 ">Commercial Credit</h5>
                        <p class="text-muted">
                        The microfinance loan product of Commercial Credit designed to support small and medium women entrepreneurs in Sri Lanka provides tailor-made loan products after evaluating your business. You do not have to let go of your business idea or delay the expansion plans because you are short of funds.
                        </p>
                        <p class="h2 fw-bold">Rate<small class="text-muted" style={{fontSizeize:"18px"}}>14%</small></p>
                        <a href="https://www.cclk.lk/products/microfinance/sme-loan/en" class="btn btn-outline-danger d-block mb-2 mt-3 text-capitalize">Connect With Commercial Credit</a>
                    </div>
                    <div class="card-footer">
                        <p class="text-uppercase fw-bold" style={{fontSizeize:"12px"}}>What's included</p>
                        <ol class="list-unstyled mb-0 px-4">
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Loan rental can be paid at the CSU</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Offering attractive interest rates</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Fast and efficient service</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Flexible repayment terms.</small>
                        </li>         
                        </ol>
                        <p class="text-uppercase fw-bold" style={{fontSizeize:"12px"}}>Eligibility</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">Customer should have business income from agriculture or self-employed business.</li>
                            <li class="list-group-item">Group customers must be the cross guarantors to the loan.</li>
                            <li class="list-group-item">The loan is granted as a joint loan with spouse or relatives of the customer.</li>
                            <li class="list-group-item">Customer should be an active member in an active CSU.</li>
                        </ul>
                    </div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="card">
                    <div class="mx-2 card-body">
                        <h5 class="card-title my-2 ">SDB Bank</h5>
                        <p class="text-muted">
                        Adapting to the agricultural needs of society members, these short-term loans meet the demand for urgent working capital that would aid in improving the growing of crops and raising of livestock, along with the overall operational productivity of small to medium-scale plantations / farms.
                    </p>
                        <p class="h2 fw-bold ">Rate<small class="text-muted" style={{fontSizeize:"12px"}}>10%</small></p>
                        <a href="https://www.sdb.lk/en/co-operative/loans-to-societies-for-re-lending-to-members/agriculture-loan" class="btn btn-outline-info d-block mb-2 mt-3 text-capitalize">Connect With SDB</a>
                    </div>
                    <div class="card-footer">
                        <p class="text-uppercase fw-bold" style={{fontSizeize:"12px"}}>What's included</p>
                        <ol class="list-unstyled mb-0 px-4">
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Repayment period of 1 year at prevailing interest rates, with a maximum 6-month grace period</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Repayment can be made monthly, or as a bullet repayment</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Loan amount depends on the capacity of the society, and can go up to Rs. 20 million with no collateral</small>
                        </li>
                        <li class="mb-3">
                            <i class="fas fa-check text-success me-3"></i><small>Flexible repayment terms.</small>
                        </li>         
                        </ol>
                        <p class="text-uppercase fw-bold" style={{fontSizeize:"12px"}}>Eligibility</p>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">SANASA Societies, Multi-Purpose Cooperative Societies, other cooperatives and registered societies may apply for this loan</li>
                            <li class="list-group-item">Suitable collateral will be required to mitigate risk on a case by case basis</li>
                            <li class="list-group-item">The loan funds should match the total volume of the Corporate Top Saver Portfolio</li>                    
                        </ul>
                    </div>
                    </div>
                </div>
            </div>    
        </form>         
    </main>
  )
}

export default compareScheme