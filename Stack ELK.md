# Stack ELK

## Instalação

### Pré-requisitos

```bash
sudo apt install nginx -y
```

### Steps

<https://www.digitalocean.com/community/tutorials/como-instalar-elasticsearch-logstash-e-kibana-elastic-stack-no-ubuntu-18-04-pt>

> Parte Ngix não realizada

## Connector Oracle DB

> ```bash
> sudo /usr/share/logstash/bin/logstash -f /home/biassio/Documentos/GitHub/stackELK/logstash-oracle-dev.conf 
> ```

## Connector Kafka ElasticSearch

> ```bash
> export CONFLUENT_CURRENT=/home/biassio/confluentWorkspace/var && confluent load elasticsearch-sinkasa
> ```
>
>

## Logs de Json local

```bash
sudo /usr/share/logstash/bin/logstash -f /home/biassio/Documentos/GitHub/stackELK/jsons.conf
```

### COnfig Logstash

```yaml
input {
    file {
        path => "/home/biassio/Documentos/GitHub/stackELK/sales/*.json"
        type => "json"
        start_position => "beginning"
        # codec => json
        sincedb_path => "/dev/null"
        # stdin { codec => json_lines }
    }
}
filter {
	json {
        source => "message"
    }
}
output {
    stdout { codec => rubydebug }
    elasticsearch { 
        index => "sales"
    }
}
```



> ```javascript
> let final = json.reduce( (format,item) => { return format + `${JSON.stringify(item)}\n` }, "")
> ```