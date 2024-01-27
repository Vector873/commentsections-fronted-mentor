import React, { useState } from "react";
import iconreply from "./assets/icon-reply.svg";
import iconedit from "./assets/icon-edit.svg";
import icondel from "./assets/icon-delete.svg";
function Comments({ c, delcmnt, delrep, replysend }) {
  const [edit, setedit] = useState(false);
  const [rep, setrep] = useState(false);
  const [repcmnt, setrepcmnt] = useState("");
  const send = (id) => {
    setrep(false);
    replysend(repcmnt, id);
    setrepcmnt("");
  };
  return (
    <>
      <div className="cmnt">
        <div className="cmnthead">
          <div className="name">
            <img src={c.user.image} alt="image not found" />
            <div className="username">
              <span>{c.user.username}</span>
              {c.user.username == "juliusomo" && (
                <span className="you">you</span>
              )}
              <p>{c.createdAt}</p>
            </div>
          </div>
          {c.user.username == "juliusomo" ? (
            edit ? (
              <button className="update" onClick={() => setedit(false)}>
                UPDATE
              </button>
            ) : (
              <div className="btnsuser">
                <button className="btndel" onClick={() => delcmnt(c.id)}>
                  <img src={icondel} alt="logo not found" /> Delete
                </button>
                <button className="btnreply" onClick={() => setedit(true)}>
                  <img src={iconedit} alt="logo not found" /> Edit
                </button>
              </div>
            )
          ) : (
            <button className="btnreply" onClick={() => setrep(true)}>
              <img src={iconreply} alt="logo not found" /> Reply
            </button>
          )}
        </div>
        <div className="para">
          {edit == true && c.user.username == "juliusomo" ? (
            <textarea value={c.content} onChange={() => {}} />
          ) : (
            <p>{c.content}</p>
          )}
        </div>
      </div>
      {rep ? (
        <div className="cmntbox">
          <img
            src={"./src/assets/avatars/image-juliusomo.png"}
            alt="image not found"
          />
          <textarea
            placeholder="Add a comment..."
            onChange={(e) => setrepcmnt(e.target.value)}
            value={repcmnt}
          />
          <button onClick={() => send(c.id)}>SEND</button>
        </div>
      ) : null}
      {c.replies.length === 0 ? null : (
        <div className="replies">
          <div className="line"></div>
          <div className="replydiv">
            {c.replies.map((r) => (
              <div className="reply" key={r.id}>
                <div className="cmnthead">
                  <div className="name">
                    <img src={r.user.image} alt="image not found" />
                    <div
                      className="username"
                      style={
                        r.user.username == "juliusomo" ? { gap: "6px" } : null
                      }
                    >
                      <span>{r.user.username}</span>
                      {r.user.username == "juliusomo" && (
                        <span className="you">you</span>
                      )}
                      <p>{r.createdAt}</p>
                    </div>
                  </div>
                  {r.user.username == "juliusomo" ? (
                    edit ? (
                      <button className="update" onClick={() => setedit(false)}>
                        UPDATE
                      </button>
                    ) : (
                      <div className="btnsuser">
                        <button
                          className="btndel"
                          onClick={() => delrep(c.id, r.id)}
                        >
                          <img src={icondel} alt="logo not found" /> Delete
                        </button>
                        <button
                          className="btnreply"
                          onClick={() => setedit(true)}
                        >
                          <img src={iconedit} alt="logo not found" /> Edit
                        </button>
                      </div>
                    )
                  ) : (
                    <button
                      className="btnreply"
                      onClick={() => {
                        setrep(true);
                      }}
                    >
                      <img src={iconreply} alt="logo not found" /> Reply
                    </button>
                  )}
                </div>
                <div className="para">
                  {edit == true && r.user.username == "juliusomo" ? (
                    <textarea value={r.content} onChange={() => {}} />
                  ) : (
                    <p>
                      <span>@{r.replyingTo}</span> {r.content}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default Comments;
