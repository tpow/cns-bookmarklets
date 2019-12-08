// default module name
var mod = 'General - Student Profile';
var quickmodules = {
   'General - Student Profile': '',
   'Contact Manager - Tasks (current)': '/tasks',
   'Contact Manager - Tasks (historical)': '/tasks-historical',
   'Contact Manager - Documents': '/documents',
   'Contact Manager - Group Memberships': '/groups',
   'Contact Manager - Related Addresses': '/related-addresses',
   'Contact Manager - Agency Affiliations': '/agency-affiliations',
   'Contact Manager - Advisors': '/student-advisors',
   'Contact Manager - Transcript Requests': '/transcript-requests',
   'Contact Manager - Contact Preferences': '/student-contact-preferences',
   'Contact Manager - FERPA': '/ferpa',
   'Contact Manager - International': '/international',
   'Contact Manager - Audit': '/audit',
   'Admissions - Inquiries': '/prospect-inquiries',
   'Admissions - Applications': '/applicants',
   'Admissions - Previous Education': '/student-previous-educations',
   'Admissions - Test Scores': '/entrance-test-scores',
   'Admissions - Deposits': '/deposits',
   'Admissions - School Fields': '/school-fields-admissions/admissions',
   'Admissions - Audit': '/student-data-changes', // It doesn't seem we can bookmark the tabs
   'Academic Records - Enrollments': '/student-enrollment-periods',
   'Academic Records - Transfer Credits': '/student-transfer-credits',
   'Academic Records - Student Courses (list)': '/student-courses',
   'Academic Records - Student Courses Daily': '/dailyschedule/', // 21 KEPT the slash here
   'Academic Records - Student Courses Weekly': '/weeklyschedule', // 21 dropped the slash
   'Academic Records - Student Courses Monthly': '/monthlyschedule', // 21 dropped the slash
   'Academic Records - Degree Progress Audit': '/degree-progress-audit',
   'Academic Records - Degree Pathway': '/degree-pathway',
   'Academic Records - Degrees Honors Badges': '/honors',
   'Academic Records - Student Status History': '/status-history',
   'Academic Records - Fees': '/student-enrollment-period-fees',
   'Academic Records - Additional GPAs': '/additional-gpa',
   'Academic Records - Registration Locks': '/registrationlocks',
   'Academic Records - School Fields': '/school-fields-academics/academics',
   'Academic Records - Audit': '/academic-audit', // Cannot bookmark the tabs
   'Career Services - Placement Statuses': '/placementStatuses',
   'Career Services - Placements and Internships': '/student-career-services-placements',
   'Career Services - Advisor and Preferences': '/placement-preferences',
   'Career Services - Certifications and Skills': '/placement-skills',
   'Career Services - Status History': '/placement-status-history',
   'Career Services - Audit': '/career-services-audit',
   'Financial Aid - Awarding': '/financial-awarding',
   'Financial Aid - Awarding - Academic Years': '/financial-awarding/academic-years',
   'Financial Aid - Awarding - Awards': '/financial-awarding/awards',
   'Financial Aid - Awarding - Student View': '/financial-awarding/student-view',
   'Financial Aid - NSLDS': '/financial-nslds',
   'Financial Aid - Estimate': '/estimate',
   'Financial Aid - SAP Summary': '/sapSummary',
   'Financial Aid - Subsidized Usage': '/student-award-loans-cod-subsidized-details',
   'Financial Aid - ISIRs Received': '/student-isir-received-client-entity/', // Can do Year-specific too:
   'Financial Aid - ISIRs Received 2020-21': '/student-isir-received-client-entity/2020-21',
   'Financial Aid - State Report Evaluation': '/state-grant-eligible-students/', // Technically ends with systudentid, too
   // Duplicating systudentid is dumb and we don't use state reports, so ignored
   'Financial Aid - School Fields': '/school-fields/financialaid',
   'Financial Aid - Audit': '/financial-audit', // Cannot bookmark the tabs
   'Student Accounts - Ledger Card': '/ledgercard',
   'Student Accounts - Ledger Card - Transactions': '/ledgercard/transactions',
   'Student Accounts - Ledger Card - Apply Credits': '/ledgercard/applyCredit',
   'Student Accounts - Ledger Card - Refunds': '/ledgercard/refunds',
   'Student Accounts - Ledger Card - Adjustments': '/ledgercard/adjustments',
   'Student Accounts - Ledger Card - Additional Info and Account status': '/ledgercard/additionalInfo',
   'Student Accounts - Payment Information': '/paymentInformation',
   'Student Accounts - Refund Calculations': '/refundCalculation',
   //'Student Accounts - Revenue Ledger': '/revenueLedger', // 19
   'Student Accounts - Revenue Ledger': '/revenueLedger/', // 20 and 21 incorrectly requires the slash
   'Student Accounts - Subsidiary': '/subsidiary',
   'Student Accounts - Tuition Discount': '/tuition-discount',
   'Student Accounts - Payment Schedule': '/paymentSchedule',
   'Student Accounts - Stipend Schedule': '/stipend-schedule',
   'Student Accounts - Collections': '/student-collections',
   'Student Accounts - School Fields': '/school-fields-studentaccounts/studentaccounts',
   'Student Accounts - Audit': '/studentAccounts-audit', // Cannot bookmark the tabs
   'Student Services - Athletics': '/student-athletic-details',
   'Student Services - Billable Services': '/student-service-types',
   'Student Services - Accomodations': '/disability',
   'Student Services - Housing Applications': '/student-application-details',
   'Student Services - Housing Leases': '/student-application-lease-details',
   'Student Services - Housing Deposits': '/housing-deposits',
   'Student Services - Veteran': '/student-veteran-details',
   'Student Services - School Fields 20.x Only': '/school-fields-studentservices/studentservices', // 20.x
   'Student Services - School Fields': '/school-field/studentservices', // 21. Why no s on school-fields?
   'Student Services - School Fields - Housing': '/school-field/housing', // Correct URL for 21, but bookmark doesn't work
   'Student Services - Audit': '/services-audit',
}

// get the browser version
var b = getBrowser();
var browser = b.browser;
function browserName() {
   var n = '';
   if (browser.chrome) n += 'Chrome';
   else if (browser.firefox) n += 'Firefox';
   else if (browser.msie) n += 'Internet Explorer';
   else if (browser.edge) n += 'Edge';
   else if (browser.opera) n += 'Opera';
   else if (browser.safari && ! browser.android) n += 'Safari';
   else n += 'Unknown browser';

   if (browser.ios) n += " on iOS";
   else if (browser.android) n += " on Android";
   return n;
}
browser.name = browserName();

// this function updates the Quick Link bookmarklet based on the form fields
function makeqlbookmarklet() {
    /* Here is a sample of the bookmarklet code in a bit more readable form:
    str =  "javascript:(function() {
       var m;
       var newwin = 0; // or 1 depending on the form checkbox
       loc = window.location;
       // Look for #/students/12345 in the URL
       if (m = loc.hash.match(/#\/students\/\d+/)) {
          hash = m[0] + '/tasks';
          if (newwin){
             url = loc.protocol + '//' + loc.hostname;
             if(loc.port){ url += ':' + loc.port; }
             url += loc.pathname + hash;
             window.open(url)
          } else {
             loc.hash = hash;
          }
       } else {
          alert('Can\\'t open Contact Manager - Tasks (current)\\n' +
                'Select a student in CampusNexus before using');
       }
     })()";
    */

    var sel = document.getElementById('mname');
    var selection = sel.options[sel.selectedIndex];
    var newwin = document.getElementById('newwin').checked ? 1 : 0;

    // compact form of bookmarklet code
    str = "javascript:(function(){/*%20from:%20" + window.location.href.split(/[?#]/)[0] + "%20*/var%20m,n=" + newwin + ",l=window.location;if(m=l.hash.match(/#\\/students\\/\\d+/)){h=m[0]+'" + selection.value + "';if(n){u=l.protocol+'//'+l.hostname;if(l.port)u+=':'+l.port;u+=l.pathname+h;window.open(u);}else{l.hash=h;}}else{alert('Can\\'t%20open%20"+ encodeURIComponent(selection.text) + "\\nSelect%20a%20student%20in%20CampusNexus%20before%20using.');}})()"

    //console.log(str);
    // insert into textarea, decoded for readability
    document.getElementById('marklet').value = decodeURIComponent(str);

    document.getElementById('bname').textContent = selection.text;

    // make it the link for drag action from hyperlink
    document.getElementById('mlink').setAttribute('href', str);
}

function fixtitle() {
    // Set the page title to match bookmark name if in URL
    if (location.hash) {
       var title = "Bookmarklets for CampusNexus Student Web Client"; // default
       var testmsg = encodeURIComponent("//bookmarkletname:"); // see iosify
       var offset = location.hash.lastIndexOf(testmsg);
       if (offset != -1) {
          offset += testmsg.length;
          title = location.hash.substring(offset);
          title = decodeURIComponent(title);
       }
       document.title = title;
    }
}

function showhelp() {
    var howto = document.getElementById('howto');
    var warn = document.getElementById('warn');
    howto.innerHTML = 'It looks like you are using <b>' + browser.name + '</b>.';
    if (browser.safari && ! browser.ios) {
       howto.innerHTML += ' On a Mac, the bookmarks toolbar is called the Favorites Bar. Enable it with <span title="Command">&#8984;</span>+Shift+B or View &gt; Show Favorites Bar.';
    } else if (browser.chrome) {
       howto.innerHTML += ' Enable the Bookmarks Bar with Ctrl+Shift+B (or <span title="Command">&#8984;</span>+Shift+B on a Mac.)';
    } else if (browser.edge || browser.msie) {
       howto.innerHTML += ' The bookmarks toolbar is called the Favorites bar. Enable it with Ctrl+Shift+B.';
    } else if (browser.firefox) {
       howto.innerHTML += ' To show the bookmarks toolbar, right-click on an empty spot on the tab bar &#8212; where the tabs are located &#8212; and select Bookmarks Toolbar from the context menu that appears.';
    } else if (browser.safari && browser.ios) {
       warn.innerHTML = "<p><strong>Extra steps are required...</strong> It looks like are using iOS on an iPhone or iPad. <strong>Click on the bookmarklets</strong> instead of dragging them and additional instructions will appear here.";
       warn.className = "warn";
    }
    if (location.hash && location.hash.indexOf('#javascript:') != -1) {
       // do stuff
       warn.innerHTML = "<p><strong>You're ready!</strong> To finish saving the bookmarklet:<br />1. Bookmark this page and close the bookmark<br />2. Edit the bookmark and change the address (URL). You need to remove everything up to and including the #. The address should begin with &quot;javascript:&quot;.<br />3. The bookmarklet is ready to use. <a href=\"#new\">Get another Bookmarklet</a>.</p>";
       warn.className = "warn";
       howto.scrollIntoView();
    }
    fixtitle();
}

document.addEventListener('DOMContentLoaded', function(){
    // build quicklinks selection list
    var dropdown = document.getElementById('mname');
    for (var prop in quickmodules) {
        if (quickmodules.hasOwnProperty(prop)) {
            var opt = document.createElement('option');
            opt.text = prop;
            opt.value = quickmodules[prop];
            dropdown.appendChild(opt);
            //console.log(opt);
        }
    }

    // Mobile Menu Toggle
    document.getElementsByClassName('mobile-menu-toggle')[0].onclick = function(e) {
        e.preventDefault()
        e.stopPropagation()
        document.getElementsByClassName('mobile-menu')[0].style = "display: block";
    }
    document.getElementsByTagName('body')[0].onclick = function(e) {
        document.getElementsByClassName('mobile-menu')[0].style = "display: none";
    }

    // call function to set value of text area and bookmarklet link
    makeqlbookmarklet();

    document.getElementById('mname').onchange = function() {
         makeqlbookmarklet();
         iosify("button");
    };
    document.getElementById('newwin').onchange = function() {
         makeqlbookmarklet();
         iosify("button");
    };

    window.onhashchange = showhelp;

    iosify("button");
    showhelp(); // in case of a page load
});

