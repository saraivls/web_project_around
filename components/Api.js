class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    getUserInfo() {
        return fetch(`${this.baseUrl}/users/me`, {
           method: "GET",
            headers: {
                ...this.headers
            }
        })
        .then((res) => res.ok ? res.json() : Promise.reject(res.status))
        .catch((error) => console.error("Error al obtener información del usuario:", error));
    }

     getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {
        console.error("Error al obtener las tarjetas:", error);
      });
  }

  setUserInfo(data) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject("Error: ${res.status}");
      }
      return res.json();
    });
  }

  addCard(data) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: {
        ...this._headers,
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {
        console.error("Error al agregar tarjeta:", error);
      });
  }

  likeCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {
        console.error("Error al dar like a la tarjeta:", error);
      });
  }

  deleteLike(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "DELETE",
      headers: {
        ...this._headers,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .catch((error) => {
        console.error("Error al eliminar like de la tarjeta:", error);
      });
  }

  deleteCard(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (!res.ok) {
        return res.json().then((err) => Promise.reject(err));
      }
      return res.json();
    });
  }

  updateProfilePicture(data) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data,
      }),
    }).then((res) => {
      if (!res.ok) {
        return Promise.reject("Error: ${res.status}");
      }
      return res.json();
    });
  }
}


export const api = new Api({
    baseUrl: "https://around-api.es.tripleten-services.com/v1",
    headers: {
        authorization: "5a640ec8-88b7-4b58-9e1f-12d8d3683b3f",
        "Content-Type": "application/json"
    }
});