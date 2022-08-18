import "./App.css";
import React from "react";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

function App() {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [recipient, setRecipient] = React.useState("");
  const [sender, setSender] = React.useState("");
  const [amount, setAmount] = React.useState("");
  const [type, setType] = React.useState("");
  const [note, setNote] = React.useState("");
  const [items, setItems] = React.useState([])

  React.useEffect(() => {
    // const res = fetch("/getItems").then((r) => r.json())

    // PLACEHOLDER
    const testItems = [
      {
        image: "https://static.vecteezy.com/system/resources/previews/005/146/414/non_2x/money-bag-pixel-art-vector.jpg",
        to: "Bob",
        type: "Cash",
        amount: "$" +  100
      },{
        image: "https://static.vecteezy.com/system/resources/previews/005/146/414/non_2x/money-bag-pixel-art-vector.jpg",
        to: "Hi",
        type: "Credit",
        amount: "$" + 500,
      },{
        image: "https://static.vecteezy.com/system/resources/previews/005/146/414/non_2x/money-bag-pixel-art-vector.jpg",
        to: "testUser",
        type: "type",
        amount: "$" + 100
      },{
        image: "https://static.vecteezy.com/system/resources/previews/005/146/414/non_2x/money-bag-pixel-art-vector.jpg",
        to: "testUser",
        type: "type",
        amount: "$" + 100
      },
    ]

    setItems(testItems)
  }, [])

  const handleSubmit = () => {
    //collection to for users collection / collection for sign in
    const body = {
      username: username,
      password: password,
    };
    const settings = {
      method: "post",
      body: JSON.stringify(body),
    };

    // Can someone look at this case im not sure if we can reverse it
    fetch("/logIn", settings)
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setIsLoggedIn(true);
        } else if (data.error) {
          setError(data.error);
        }
      })
      .catch((e) => console.log(e));
  };

  const handleTransfer = () => {
    const body = {
      sender: sender,
      recipient: recipient,
      amount: amount,
      type: type,
      note: note
    };
    const settings = {
      method: "post",
      body: JSON.stringify(body),
    };
    fetch("/transfer", settings)
      .then((res) => res.json())
      .then((data) => {if(data.transferSuccess){
         alert("Payment Successfully added");
      } else{
        alert("Recipient Does Not Exist!")
      }})
      .catch((e) => console.log(e));


    window.location.reload(false);
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const particlesLoaded = (container) => {
    console.log(container);
  }

  if (isLoggedIn) {
    return (
      <div id="container" >
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            "particles": {
              "number": {
                "value": 25,
                "density": {
                  "enable": true,
                  "value_area": 800
                }
              },
              "color": {
                "value": "#ffffff"
              },
              "shape": {
                "type": "circle",
                "stroke": {
                  "width": 0,
                  "color": "#000000"
                },
                "polygon": {
                  "nb_sides": 5
                },
                "image": {
                  "src": "img/github.svg",
                  "width": 100,
                  "height": 100
                }
              },
              "opacity": {
                "value": 0.7970391180485954,
                "random": false,
                "anim": {
                  "enable": false,
                  "speed": 1,
                  "opacity_min": 0.1,
                  "sync": false
                }
              },
              "size": {
                "value": 3,
                "random": true,
                "anim": {
                  "enable": false,
                  "speed": 40,
                  "size_min": 0.1,
                  "sync": false
                }
              },
              "line_linked": {
                "enable": false,
                "distance": 0,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
              },
              "move": {
                "enable": true,
                "speed": .3,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false,
                "attract": {
                  "enable": false,
                  "rotateX": 600,
                  "rotateY": 1200
                }
              }
            },
            "interactivity": {
              "detect_on": "canvas",
              "events": {
                "onhover": {
                  "enable": false,
                  "mode": "repulse"
                },
                "onclick": {
                  "enable": false,
                  "mode": "push"
                },
                "resize": true
              },
              "modes": {
                "grab": {
                  "distance": 400,
                  "line_linked": {
                    "opacity": 1
                  }
                },
                "bubble": {
                  "distance": 400,
                  "size": 40,
                  "duration": 2,
                  "opacity": 8,
                  "speed": 3
                },
                "repulse": {
                  "distance": 200,
                  "duration": 0.4
                },
                "push": {
                  "particles_nb": 4
                },
                "remove": {
                  "particles_nb": 2
                }
              }
            },
            "retina_detect": true
          }}
        />
        <div class="beforeMother">
          <div class="motherBox2">
            <div id="WelcomeBox">
              <h1 id="WelcomeHeader">Send Payments As: {username}</h1>
              <div id="to">
                <input placeholder="To" type="text" value={recipient} onChange={(e) => setRecipient(e.target.value)} required />
              </div>
              <div id="from">
                <input placeholder="From:" type="text" value={sender} onChange={(e) => setSender(e.target.value)} required />
              </div>
              <div id="amount">
                <input placeholder="Amount:" type="text" value={amount} onChange={(e) => setAmount(e.target.value)} required />
              </div>
              <div id="type">
                <input placeholder="Cash/Credit:" type="text" value={type} onChange={(e) => setType(e.target.value)} required />
              </div>
              <div id="notes">
                <input placeholder="Notes:" type="text" value={note} onChange={(e) => setNote(e.target.value)} />
              </div>
              <button name="button" onClick={handleTransfer}>Submit</button>
            </div>
          </div>
        </div>
        <div class="beforeMother2">
          <div class="motherBox">
            <div id="WelcomeBox" class="transactionContainer">
              {items.map((item) => (
                <div className="transaction">
                  <img className="image" src={item.image} height={60} width={60} />
                  <div className="sideInfo">
                    <div>To: {item.to}</div>
                    <div>Type: {item.type}</div>
                    <div>Amount: {item.amount}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div class="motherBox">
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          "particles": {
            "number": {
              "value": 25,
              "density": {
                "enable": true,
                "value_area": 800
              }
            },
            "color": {
              "value": "#ffffff"
            },
            "shape": {
              "type": "circle",
              "stroke": {
                "width": 0,
                "color": "#000000"
              },
              "polygon": {
                "nb_sides": 5
              },
              "image": {
                "src": "img/github.svg",
                "width": 100,
                "height": 100
              }
            },
            "opacity": {
              "value": 0.7970391180485954,
              "random": false,
              "anim": {
                "enable": false,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
              }
            },
            "size": {
              "value": 3,
              "random": true,
              "anim": {
                "enable": false,
                "speed": 40,
                "size_min": 0.1,
                "sync": false
              }
            },
            "line_linked": {
              "enable": false,
              "distance": 0,
              "color": "#ffffff",
              "opacity": 0.4,
              "width": 1
            },
            "move": {
              "enable": true,
              "speed": .3,
              "direction": "none",
              "random": false,
              "straight": false,
              "out_mode": "out",
              "bounce": false,
              "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
              }
            }
          },
          "interactivity": {
            "detect_on": "window",
            "events": {
              "onhover": {
                "enable": false,
                "mode": "repulse"
              },
              "onclick": {
                "enable": false,
                "mode": "push"
              },
              "resize": true
            },
            "modes": {
              "grab": {
                "distance": 400,
                "line_linked": {
                  "opacity": 1
                }
              },
              "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
              },
              "repulse": {
                "distance": 200,
                "duration": 0.4
              },
              "push": {
                "particles_nb": 4
              },
              "remove": {
                "particles_nb": 2
              }
            }
          },
          "retina_detect": true
        }}
      />
      <div id="WelcomeBox">
        <h1 id="WelcomeHeader">Welcome! Sign in or Sign up!</h1>
        <div id="username">
          {" "}
          <input placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div id="password">
          {" "}
          <input placeholder="password " type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button name="button" disabled={username === "" || password === ""} onClick={handleSubmit}>
          Submit
        </button>
        {error}
      </div>
    </div>
  );
}

export default App;
