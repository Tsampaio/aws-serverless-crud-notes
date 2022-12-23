const generatePolicy = (principalId, effect, resource) => {
  const authResponse = {};

  authResponse.principalId = principalId;

  if (effect && resource) {
    const policyDocument = {
      Version: '2012-10-17',
      Statement: [
        {
          Effect: effect,
          Resource: resource,
          Action: 'execute-api:Invoke',
        },
      ],
    };

    authResponse.policyDocument = policyDocument;
  }

  authResponse.context = {
    foo: 'bar',
  };
  console.log(JSON.stringify(authResponse));

  return authResponse;
};

exports.handler = (event, context, callback) => {
  //lambda authorizer code
  const token = event.authorizationToken; // "allow" or "deny"
  console.log('the token is ' + token);
  switch (token) {
    case 'Allow':
      callback(null, generatePolicy('user', 'Allow', event.methodArn));
      break;
    case 'Deny':
      callback(null, generatePolicy('user', 'Deny', event.methodArn));
      break;
    default:
      callback('Error, invalid token');
  }
};
