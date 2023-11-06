'use client';

import ArticleLayout from '@/app/components/articleLayout';
import CodeBlock from '@/app/components/codeblock';

const CSRFPage = () => {
  return (
    <ArticleLayout>
      <h1>Cross-Site Request Forgery (CSRF)</h1>
      <hr className='m-3'></hr>
      <h2>What is Cross-Site Request Forgery?</h2>

      <p>
        Cross-site request forgery (CSRF) is a web vulnerability that allows an
        attacker to force the end user to execute unwanted actions on a
        vulnerable website. In a successful CSRF attack, the attacker can force
        the victim to perform unintended actions, such as changing their
        password, transferring funds and even gaining full control of the
        application's data and functionality.
      </p>
      <h2>How does CSRF Work?</h2>
      <h3>GET Requests</h3>
      <p>
        Suppose we have a banking application that uses GET requests to transfer
        funds. Say Bob wanted to transfer $100 to Alice, an HTTP for this action
        might look like this:
      </p>
      <CodeBlock
        lines={[
          `GET http://bank.com/transfer?acc=alice&amount=100 HTTP/1.1`,
          `Cookie: session=[Bob's session token]`,
        ]}
      />
      <p>
        A malicious attacker (call them Ollie) can construct the following url:
      </p>
      <CodeBlock
        lines={[
          `GET http://bank.com/transfer?acc=ollie&amount=1000000`,
          `Cookie: session=[Bob's session token]`,
        ]}
      />
      <p>
        Through some social engineering, Ollie gets Bob to click on this
        malicious link while he is logged in (maybe through a phishing email or
        fake 0x0 image). Since Bob was logged in, the request will appear to be
        a legit request from Bob... Ollie is very happy!
      </p>
      <h3>POST Requests</h3>
      <p>
        If we had an application that uses POST requests to let a user change
        their email address on their account, they might make the following
        request:
      </p>
      <CodeBlock
        lines={[
          `POST http://bank.com/auth/email/change`,
          `Cookie: session=[Bob's session token]`,
          `\n`,
          `new_email=Bob2.0@email.com`,
        ]}
      />
      <p>
        An attacker can't get BOB to execute POST requests through a link
        directly, but what if they construct a website with the following form:
      </p>
      <CodeBlock
        lines={[
          `<form action="http://bank.com/auth/email/change" method="POST">`,
          `   <input type="hidden" name="email" value="hacked@lmao.com" />`,
          `</form>`,
          `<script>`,
          `   document.forms[0].submit();`,
          `</script>`,
        ]}
      />
      <p>
        An attacker sends a link to this website to Bob who unsuspectingly
        clicks on it. This automatically triggers an HTTP request with the
        malicious action and if Bob is logged in, the vulnerable website will
        treat it as a legit request... oh no Bob can no longer use his email log
        in to his account!
      </p>
    </ArticleLayout>
  );
};

export default CSRFPage;
