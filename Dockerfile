FROM nothingworksright/amd64_debian_jessie_node

# Enable the systemd init system
ENV INITSYSTEM on

RUN apt-get install -y \
  wget \
  build-essential \
  chrpath \
  libssl-dev \
  libxft-dev \
  libfreetype6-dev \
  libfreetype6 \
  libfontconfig1-dev \
  libfontconfig1

# Prepare the trackertimer application files and directories
RUN mkdir -p /usr/local/trackertimer
WORKDIR /usr/local/trackertimer
COPY . /usr/local/trackertimer
RUN npm install

# Install phantomjs - https://github.com/ariya/phantomjs
RUN wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2
RUN tar -xjvf phantomjs-2.1.1-linux-x86_64.tar.bz2 -C /usr/local/share/
RUN ln -s /usr/local/share/phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/bin/

# Install confessjs - https://github.com/jamesgpearce/confess
RUN wget https://raw.githubusercontent.com/jamesgpearce/confess/master/confess.js

# Prepare the systemd based service
COPY trackertimer.service /lib/systemd/system/trackertimer.service
RUN systemctl enable trackertimer.service

# Listens to the specified network port at runtime
EXPOSE 3417

# Run systemd
CMD [ "/usr/sbin/init" ]



######
#
# docker build -t nothingworksright/trackertimer:0.0.1 .
#
# docker run --detach --privileged --name trackertimer nothingworksright/trackertimer:0.0.1
#
# docker stop trackertimer
#
# docker rm trackertimer
#
# docker rmi nothingworksright/trackertimer:0.0.1
#
######


