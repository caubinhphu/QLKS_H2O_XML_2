<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:template match="/">
        
        <div class="mx-auto" style="width: 400px">
            <div class="d-flex align-items-center">
                <select class="form-control" id="selectLoaiPhong">
                    <xsl:for-each select="QLKS_H2O/LOAIPHONG">
                        <option>
                            <xsl:attribute name="value">
                                <xsl:value-of select="MA_LOAIPHONG"/>
                            </xsl:attribute>
                            <xsl:value-of select="TEN_LOAIPHONG"/>
                        </option>
                    </xsl:for-each>
                </select>
                <div>
                    <button id="xemBtn" class="btn btn-success ml-2">Xem</button>
                </div>
            </div>
        </div>
        
    </xsl:template>
    
</xsl:stylesheet>